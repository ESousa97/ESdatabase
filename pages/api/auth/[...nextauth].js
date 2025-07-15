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
      authorizationUrl: 'suachaveaqui',
    }),
    // Adicione outros provedores conforme necessário
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const allowedEmails = ['digiteseu@emailaqui.com.br'];
  
      // Verifica se algum dos e-mails do usuário está na lista de permitidos
      const userEmails = [user.email, account.email, profile.email, email?.email, credentials?.email];
      const isAllowedEmail = userEmails.some(email => allowedEmails.includes(email));
  
      if (isAllowedEmail) {
        return true; // O login será bem-sucedido se o e-mail estiver na lista de permitidos
      } else {
        return false; // O login será bloqueado se o e-mail não estiver na lista de permitidos
      }
    },
  },
    
  });
