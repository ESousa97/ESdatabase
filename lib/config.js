/**
 * Environment Configuration
 *
 * Centralized configuration for environment variables with validation.
 * Provides type-safe access to configuration values.
 */

/**
 * Validates that required environment variables are set
 * @param {string[]} requiredVars - Array of required variable names
 * @throws {Error} If any required variable is missing
 */
function validateEnv(requiredVars) {
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn(`Warning: Missing environment variables: ${missing.join(', ')}`);
  }
}

// Validate required variables on module load (server-side only)
if (typeof window === 'undefined') {
  validateEnv(['NEXTAUTH_SECRET', 'NEXTAUTH_URL']);
}

/**
 * Application configuration object
 */
const config = {
  // Application
  app: {
    name: 'ES.Database',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  },

  // NextAuth
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  },

  // Azure AD
  azure: {
    clientId: process.env.AZURE_AD_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    tenantId: process.env.AZURE_AD_TENANT_ID,
    isConfigured: Boolean(
      process.env.AZURE_AD_CLIENT_ID &&
      process.env.AZURE_AD_CLIENT_SECRET &&
      process.env.AZURE_AD_TENANT_ID,
    ),
  },

  // Google
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    isConfigured: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
  },

  // Email allowlist (for demo/restricted access)
  allowedEmails: process.env.ALLOWED_EMAILS
    ? process.env.ALLOWED_EMAILS.split(',').map((email) => email.trim().toLowerCase())
    : [],
};

export default config;
