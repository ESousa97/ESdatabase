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
      const allowedEmails = ['sousa3086@outlook.com', 'eloisesousa2022@outlook.com', 'bvalentim@positivo.com.br', 'sousa308697@gmail.com', 'eloisefernandesdossantos@gmail.com', 'jenoque@positivo.com.br', 'diego.silva@grupoimc.com.br', 'thiago.tabarana@grupoimc.com.br', 'lucas.mendes@grupoimc.com.br', 'rafaelas@positivo.com.br', 'kemily.fogaca@positivo.com.br', 'rodrigo.dartora@positivo.com.br', 'tiago.preto@positivo.com.br', 'pedro.tavares@positivo.com.br', 'katielen.silva@positivo.com.br', 'enzoc@positivo.com.br', 'diegoe@positivo.com.br', 'christopherp@positivo.com.br', 'felipe.araujo@grupoimc.com.br', 'rafael.correia@grupoimc.com.br', 'guilherme.nazario@grupoimc.com.br', 'rikelme.sobrinho@grupoimc.com.br', 'marcelo.vasconcelos@grupoimc.com.br', 'lucas.oliveira@grupoimc.com.br', 'renato.barros@grupoimc.com.br', 'adriano.santos@grupoimc.com.br', 'gustavo.lima@grupoimc.com.br'];
  
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
