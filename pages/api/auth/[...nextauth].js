// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: 'openid email profile User.Read offline_access' } },
    }),
    // Adicione outros provedores conforme necessário
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        const allowedEmails = ['sousa3086@outlook.com', 'admin@enoque171.onmicrosoft.com', 'bvalentim@positivo.com.br']; // Substitua pelos e-mails permitidos
        if (user.email && allowedEmails.includes(user.email)) {
          return true; // O login será bem-sucedido
        } else {
          return false; // O login será bloqueado
        }
      },
    },
  });
