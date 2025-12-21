import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import config from '../../../lib/config';

/**
 * NextAuth.js Configuration
 *
 * Provides authentication via:
 * - Azure AD (Corporate SSO)
 * - Google (OAuth 2.0)
 *
 * Access control is managed via email allowlist configured
 * in environment variables (ALLOWED_EMAILS).
 *
 * @see https://next-auth.js.org/configuration/options
 */

// Build providers array dynamically based on configuration
const providers = [];

// Add Azure AD provider if configured
if (config.azure.isConfigured) {
  providers.push(
    AzureADProvider({
      clientId: config.azure.clientId,
      clientSecret: config.azure.clientSecret,
      tenantId: config.azure.tenantId,
      authorization: {
        params: {
          scope: 'openid email profile User.Read offline_access',
        },
      },
    }),
  );
}

// Add Google provider if configured
if (config.google.isConfigured) {
  providers.push(
    GoogleProvider({
      clientId: config.google.clientId,
      clientSecret: config.google.clientSecret,
    }),
  );
}

export default NextAuth({
  providers,

  // Use secure cookies in production
  useSecureCookies: config.app.isProd,

  // Session configuration
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Custom pages
  pages: {
    signIn: '/login',
    error: '/login',
  },

  callbacks: {
    /**
     * Sign-in callback
     * Controls who can sign in based on email allowlist
     */
    async signIn({ user, account, profile }) {
      // If no allowlist configured, allow all authenticated users
      if (config.allowedEmails.length === 0) {
        return true;
      }

      // Check if user's email is in the allowlist
      const userEmail = (user?.email || profile?.email || '').toLowerCase();

      if (config.allowedEmails.includes(userEmail)) {
        return true;
      }

      // Log failed attempt in development
      if (config.app.isDev) {
        console.log(`Sign-in blocked for: ${userEmail}`);
      }

      return false;
    },

    /**
     * JWT callback
     * Adds custom claims to the JWT token
     */
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },

    /**
     * Session callback
     * Exposes token data to the client session
     */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.provider = token.provider;
      }
      return session;
    },
  },

  // Enable debug mode in development
  debug: config.app.isDev,
});
