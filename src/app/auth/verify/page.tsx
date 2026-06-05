export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        <a href="/" className="text-2xl font-bold text-indigo-600">
          ListCraft <span className="text-gray-400">AI</span>
        </a>

        <div className="mt-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Check your email</h1>
          <p className="mt-2 text-sm text-gray-600">
            A sign-in link has been sent to your email address. Click the link to log in.
          </p>
        </div>

        <div className="mt-8">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
