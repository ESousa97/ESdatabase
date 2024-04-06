import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; // Importar o provedor do Google
import AzureADProvider from 'next-auth/providers/azure-ad';

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: 'openid email profile User.Read offline_access' } },
    }),
    // Adicionando o Google como um provedor de autenticação
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    // Adicione outros provedores conforme necessário
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
        const allowedEmails = ['sousa3086@outlook.com', 'eloisesousa2022@outlook.com', 'bvalentim@positivo.com.br', 'sousa308697@gmail.com', 'eloisefernandesdossantos@gmail.com', 'jenoque@positivo.com.br']; // Substitua pelos e-mails permitidos
        if (user.email && allowedEmails.includes(user.email)) {
          return true; // O login será bem-sucedido
        } else {
          return false; // O login será bloqueado
        }
      },
    },
  });
