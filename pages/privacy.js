import * as React from 'react';
import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>Política de Privacidade do Data Base</title>
      </Head>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Política de Privacidade do Data Base
        </Typography>
        <Typography paragraph>
          Última Atualização: 08.10.2024
        </Typography>
        <Typography paragraph>
          Bem-vindo ao Data Base. Este documento detalha como suas informações eram coletadas, usadas e protegidas durante o período em que o serviço estava ativo. O Data Base foi descontinuado em **08 de outubro de 2024**, e não coleta mais dados ou mantém funcionalidades que exigem tratamento de dados pessoais.
        </Typography>
        <Typography paragraph>
          Durante o período ativo, esta Política de Privacidade se aplicava a todos os usuários, incluindo parceiros estratégicos como a **Positivo Brasil** e a **International Meal Company (IMC)**, detalhando como suas informações eram coletadas e utilizadas.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Informações Coletadas Durante o Período Ativo
        </Typography>
        <Typography paragraph>
          <strong>Dados de Acesso:</strong> Utilizávamos serviços de autenticação 2FA fornecidos pela Microsoft e Google. Não armazenávamos suas credenciais de login ou senhas.
        </Typography>
        <Typography paragraph>
          <strong>Dados de Uso:</strong> Coletávamos informações sobre como os usuários acessavam e utilizavam o Data Base, incluindo ações realizadas dentro da plataforma.
        </Typography>
        <Typography paragraph>
          <strong>Informações de Contato:</strong> Se os usuários entravam em contato diretamente, podíamos receber informações adicionais, como nome, e-mail, número de telefone e o conteúdo da comunicação.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Uso das Informações
        </Typography>
        <Typography paragraph>
          As informações coletadas eram utilizadas para:
        </Typography>
        <ul>
          <li>Operar e manter o Data Base;</li>
          <li>Melhorar e personalizar a plataforma;</li>
          <li>Analisar o uso do Data Base;</li>
          <li>Comunicar com os usuários e fornecer atualizações sobre o serviço.</li>
        </ul>

        <Typography variant="h6" component="h2" gutterBottom>
          Compartilhamento de Informações
        </Typography>
        <Typography paragraph>
          Durante o período ativo, as informações dos usuários podiam ser compartilhadas com:
        </Typography>
        <ul>
          <li>Parceiros estratégicos, como a **Positivo** e a **IMC**, para fornecer os serviços acordados;</li>
          <li>Fornecedores de serviços que auxiliavam na operação do Data Base;</li>
          <li>Autoridades legais, para cumprimento de leis ou regulamentos aplicáveis.</li>
        </ul>

        <Typography variant="h6" component="h2" gutterBottom>
          Segurança das Informações
        </Typography>
        <Typography paragraph>
          Durante o período ativo, empregávamos medidas de segurança para proteger as informações contra acesso não autorizado. Contudo, com a descontinuação do serviço, qualquer dado anteriormente coletado não é mais processado ou mantido.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Seus Direitos
        </Typography>
        <Typography paragraph>
          Enquanto o serviço estava ativo, os usuários tinham o direito de acessar, corrigir ou excluir suas informações pessoais. Com a descontinuação do Data Base, não mantemos mais dados ou informações pessoais em nossos servidores.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Serviço Descontinuado
        </Typography>
        <Typography paragraph>
          O Data Base foi descontinuado em **08 de outubro de 2024**. Desde então, não coletamos mais dados pessoais nem processamos informações de usuários. Qualquer dado coletado antes desta data não é mais mantido, e o uso da plataforma é permitido apenas para fins de consulta e visualização do código.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Contato
        </Typography>
        <Typography paragraph>
          Para quaisquer questões relacionadas a esta Política de Privacidade ou ao uso anterior do Data Base, entre em contato pelo e-mail <a href="mailto:sousa3086@outlook.com" target='_blank'>sousa3086@outlook.com</a>.
        </Typography>

        <Typography paragraph>
          Esta Política de Privacidade reflete o período em que o serviço estava ativo e as práticas de tratamento de dados durante esse tempo. Com a descontinuação, qualquer dado ou informação pessoal não é mais coletado ou mantido.
        </Typography>
      </Box>
    </Container>
  );
}
