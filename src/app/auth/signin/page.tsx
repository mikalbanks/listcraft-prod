'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    await signIn('email', {
      email,
      redirect: false,
      callbackUrl: '/generate',
    });

    setIsLoading(false);
    setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <a href="/" className="text-2xl font-bold text-indigo-600">
              ListCraft <span className="text-gray-400">AI</span>
            </a>
            <h1 className="mt-4 text-xl font-bold text-gray-900">
              {sent ? 'Check your email' : 'Sign in to your account'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {sent
                ? `We sent a magic link to ${email}`
                : 'Enter your email to receive a magic sign-in link.'}
            </p>
          </div>

          {sent ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-indigo-50 p-4 text-center">
                <svg className="mx-auto mb-2 h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-indigo-700">
                  Click the link in your email to sign in.
                </p>
              </div>
              <button
                onClick={() => setSent(false)}
                className="block w-full text-center text-sm text-gray-500 hover:text-gray-700"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <a href="/generate" className="text-sm text-gray-500 hover:text-gray-700">
              Continue without signing in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
