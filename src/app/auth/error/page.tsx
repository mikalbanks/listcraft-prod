export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        <a href="/" className="text-2xl font-bold text-indigo-600">
          ListCraft <span className="text-gray-400">AI</span>
        </a>

        <div className="mt-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Authentication Error</h1>
          <p className="mt-2 text-sm text-gray-600">
            Something went wrong during sign in. The link may have expired or already been used.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <a
            href="/auth/signin"
            className="block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Try Again
          </a>
          <a href="/" className="block text-sm text-gray-500 hover:text-gray-700">
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
