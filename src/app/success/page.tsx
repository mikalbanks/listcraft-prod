export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
        <p className="mt-3 text-gray-600">
          Your account has been upgraded. Start generating unlimited product listings now.
        </p>
        <a
          href="/generate"
          className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Start Generating Listings
        </a>
        <p className="mt-4 text-sm text-gray-500">
          Need help? Contact us at support@listcraftai.com
        </p>
      </div>
    </div>
  );
}
