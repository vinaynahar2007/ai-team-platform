from app.ai.matcher import (
    calculate_match_score,
    generate_recommendation,
    generate_balanced_team,
    generate_project_ideas
)

from app.schemas.user import (
    ProfileUpdate,
    UserCreate,
    UserLogin
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token,
    verify_token
)

from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.models.user import User
from app.database import get_db

router = APIRouter()

security = HTTPBearer()


@router.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_pw = hash_password(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_pw
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User created successfully 🚀",
        "user_id": new_user.id
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.get("/profile")
def get_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    email = verify_token(token)

    if not email:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    return {
        "message": "Protected profile data 🚀",
        "email": email
    }


@router.post("/profile")
def update_profile(
    profile: ProfileUpdate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    email = verify_token(token)

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.skills = profile.skills
    user.interests = profile.interests
    user.experience = profile.experience
    user.bio = profile.bio

    db.commit()

    return {
        "message": "Profile updated successfully 🚀"
    }


@router.get("/profile/me")
def get_my_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    email = verify_token(token)

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "username": user.username,
        "email": user.email,
        "skills": user.skills,
        "interests": user.interests,
        "experience": user.experience,
        "bio": user.bio
    }


@router.get("/match-users")
def match_users(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    email = verify_token(token)

    current_user = db.query(User).filter(
        User.email == email
    ).first()

    if not current_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    users = db.query(User).all()

    recommendations = []

    for user in users:

        if user.id == current_user.id:
            continue

        match_data = calculate_match_score(
            current_user,
            user
            )

        score = match_data["score"]

        recommendation = generate_recommendation(
            score
        )

        recommendations.append({

        "username": user.username,

        "email": user.email,

        "match_score": score,

        "common_skills": match_data["common_skills"],

        "common_interests": match_data["common_interests"],

        "recommendation": recommendation
    })

    recommendations.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return {
        "matches": recommendations
    }

@router.get("/generate-team")
def generate_team(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    email = verify_token(token)

    current_user = db.query(User).filter(
        User.email == email
    ).first()

    if not current_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    users = db.query(User).all()

    team = generate_balanced_team(users)

    return {
        "generated_team": [
            {
                "username": user.username,
                "email": user.email,
                "skills": user.skills,
                "bio": user.bio
            }
            for user in team
        ]
    }

@router.get("/project-ideas")
def project_ideas(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):

    token = credentials.credentials

    email = verify_token(token)

    current_user = db.query(User).filter(
        User.email == email
    ).first()

    if not current_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    projects = generate_project_ideas(
        current_user.skills or ""
    )

    return {
        "projects": projects
    }