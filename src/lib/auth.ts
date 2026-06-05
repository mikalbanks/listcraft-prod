/**
 * NextAuth.js configuration (shared across products 2-5).
 *
 * Uses email magic link (passwordless) for zero-friction signup.
 * Stores sessions in JWT to avoid needing a database adapter initially.
 * When Supabase is configured, it syncs users to the users table.
 */

import type { NextAuthOptions, Session } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import type { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || 'smtp.resend.com',
        port: Number(process.env.EMAIL_SERVER_PORT || 587),
        auth: {
          user: process.env.EMAIL_SERVER_USER || 'resend',
          pass: process.env.EMAIL_SERVER_PASSWORD || process.env.RESEND_API_KEY || '',
        },
      },
      from: process.env.EMAIL_FROM || 'ListCraft AI <noreply@listcraftai.com>',
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        (session.user as { id?: string }).id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },

    async signIn({ user }) {
      // Sync user to Supabase on sign in (if configured)
      if (user.email && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        try {
          const { getSupabaseServer } = await import('./supabase');
          const supabase = getSupabaseServer();

          const { data: existing } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single();

          if (!existing) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from('users') as any).insert([{
              email: user.email,
              name: user.name || null,
              plan: 'free',
            }]);
          }
        } catch (err) {
          console.error('Failed to sync user to Supabase:', err);
          // Don't block sign-in if Supabase is down
        }
      }
      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-in-production',
};
