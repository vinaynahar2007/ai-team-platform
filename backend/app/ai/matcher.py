def calculate_match_score(user1, user2):

    score = 0

    user1_skills = set(
        user1.skills.lower().split(",")
    ) if user1.skills else set()

    user2_skills = set(
        user2.skills.lower().split(",")
    ) if user2.skills else set()

    user1_interests = set(
        user1.interests.lower().split(",")
    ) if user1.interests else set()

    user2_interests = set(
        user2.interests.lower().split(",")
    ) if user2.interests else set()

    common_skills = user1_skills.intersection(
        user2_skills
    )

    common_interests = user1_interests.intersection(
        user2_interests
    )

    score += len(common_skills) * 20

    score += len(common_interests) * 10

    score = min(score, 100)

    return {
        "score": score,
        "common_skills": list(common_skills),
        "common_interests": list(common_interests)
    }


def generate_recommendation(score):

    if score >= 80:
        return "Excellent teammate match 🔥"

    elif score >= 60:
        return "Strong AI teammate match 🚀"

    elif score >= 40:
        return "Good collaboration potential 👍"

    elif score >= 20:
        return "Average compatibility 🙂"

    else:
        return "Low compatibility ❌"
    
def generate_balanced_team(users):

    ai_users = []
    frontend_users = []
    design_users = []

    for user in users:

        skills = user.skills.lower() if user.skills else ""

        if "ai" in skills or "python" in skills:
            ai_users.append(user)

        elif "react" in skills or "frontend" in skills:
            frontend_users.append(user)

        elif "design" in skills or "figma" in skills:
            design_users.append(user)

    team = []

    if ai_users:
        team.append(ai_users[0])

    if frontend_users:
        team.append(frontend_users[0])

    if design_users:
        team.append(design_users[0])

    return team

def generate_project_ideas(skills):

    skills_text = skills.lower()

    projects = []

    if "ai" in skills_text or "python" in skills_text:

        projects.append({
            "title": "AI Resume Analyzer",
            "description": "Analyze resumes using AI",
            "tech_stack": [
                "FastAPI",
                "React",
                "OpenAI"
            ]
        })

    if "react" in skills_text or "frontend" in skills_text:

        projects.append({
            "title": "Realtime Collaboration Platform",
            "description": "Team collaboration dashboard",
            "tech_stack": [
                "React",
                "Node.js",
                "Socket.IO"
            ]
        })

    if "design" in skills_text or "figma" in skills_text:

        projects.append({
            "title": "UI Inspiration Generator",
            "description": "Generate modern UI ideas",
            "tech_stack": [
                "Figma API",
                "React",
                "Tailwind CSS"
            ]
        })

    if not projects:

        projects.append({
            "title": "General Productivity App",
            "description": "Task management platform",
            "tech_stack": [
                "FastAPI",
                "React",
                "PostgreSQL"
            ]
        })

    return projects 