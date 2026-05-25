export default function LoadingSpinner() {

  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-900">

      <div className="flex flex-col items-center">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-white mt-6 text-xl font-semibold">

          Loading...

        </p>

      </div>

    </div>

  )

}