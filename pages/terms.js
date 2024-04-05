// pages/terms.js

import * as React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Button } from '@mui/material';

export default function TermsOfService() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>Termos de Uso e Serviço</title>
      </Head>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Termos de Uso e Serviço
        </Typography>
        <Typography paragraph>
          Última Atualização: 05.04.2024
        </Typography>
        <Typography paragraph>
          Bem-vindo ao Data Base, a sua plataforma confiável para consulta e gestão de procedimentos operacionais para sistemas e tecnologias relacionadas. Este documento detalha os Termos de Uso e Serviço aplicáveis a todos os usuários, incluindo parceiros estratégicos como a Positivo e a International Meal Company (IMC), ao acessarem ou usarem os serviços do Data Base.
        </Typography>
        <Typography paragraph>
          <strong>Aceitação dos Termos</strong>
          <br />
          Ao acessar ou utilizar o Data Base, você, incluindo representantes e afiliados da Positivo e da IMC, confirma ter lido, compreendido e aceitado estes Termos de Uso e Serviço integralmente. Caso não concorde com os termos aqui estabelecidos, não é permitido o acesso ou uso dos serviços.
        </Typography>
        <Typography paragraph>
          <strong>Alterações nos Termos</strong>
          <br />
          O Data Base reserva-se o direito de modificar estes Termos a qualquer momento. Tais modificações serão comunicadas com antecedência e o uso continuado do serviço indica a aceitação dos Termos atualizados.
        </Typography>
        <Typography paragraph>
          <strong>Acesso Corporativo</strong>
          <br />
          Parceiros estratégicos, como a Positivo e a IMC, podem acessar o Data Base através de contas corporativas especificamente designadas para tal. O uso dessas contas está sujeito a estes Termos e a quaisquer acordos adicionais entre o Data Base e as empresas parceiras.
        </Typography>
        <Typography paragraph>
          <strong>Segurança e Confidencialidade</strong>
          <br />
          Todos os usuários, incluindo parceiros corporativos, comprometem-se a manter a segurança das suas credenciais de acesso e a tratar todas as informações obtidas através do Data Base como confidenciais, não divulgando tais informações sem consentimento expresso. Importante destacar que o Data Base não armazena logins ou senhas de usuários, utilizando serviços 2FA da Microsoft e Google para autenticação por filtro de e-mail.
        </Typography>
        <Typography paragraph>
          <strong>Uso Permitido</strong>
          <br />
          O serviço é destinado ao uso legítimo em conformidade com os Termos aqui apresentados, leis aplicáveis, direitos de terceiros, e não deve ser utilizado para qualquer atividade ilegal ou não autorizada.
        </Typography>
        <Typography paragraph>
          <strong>Propriedade Intelectual</strong>
          <br />
          O Data Base e todo o seu conteúdo, funcionalidades e recursos são protegidos por direitos de propriedade intelectual, sendo de propriedade exclusiva do Data Base e seus licenciantes. O uso do serviço não transfere esses direitos a nenhum usuário, incluindo parceiros.
        </Typography>
        <Typography paragraph>
          <strong>Responsabilidades dos Parceiros</strong>
          <br />
          Parceiros como a Positivo e a IMC assumem a responsabilidade pelo uso do serviço por seus representantes, garantindo a conformidade com estes Termos.
        </Typography>
        <Typography paragraph>
          <strong>Isenção de Garantias e Limitação de Responsabilidade</strong>
          <br />
          O Data Base é fornecido "como está", sem garantias. A responsabilidade do Data Base por quaisquer questões decorrentes do uso do serviço é limitada nos termos mais amplos permitidos por lei.
        </Typography>
        <Typography paragraph>
          <strong>Jurisdição e Lei Aplicável</strong>
          <br />
          Estes Termos são regidos pelas leis do Brasil, especificamente do estado de São Paulo, município de São Bernardo do Campo. Quaisquer disputas relacionadas ao serviço serão resolvidas na jurisdição local, observando as seguintes legislações aplicáveis:
        </Typography>
        <ul>
          <li>Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018;</li>
          <li>Código de Defesa do Consumidor (CDC), Lei nº 8.078/1990;</li>
          <li>Marco Civil da Internet, Lei nº 12.965/2014;</li>
          <li>Lei de Direitos Autorais, Lei nº 9.610/1998;</li>
          <li>Lei do Software, Lei nº 9.609/1998.</li>
        </ul>
        <Typography paragraph>
          <strong>Contato</strong>
          <br />
          Em caso de dúvidas, entre em contato pelo e-mail <a href="mailto:sousa3086@outlook.com">sousa3086@outlook.com</a>.
        </Typography>
        <Typography paragraph>
          Estes Termos de Uso e Serviço representam o acordo completo entre todos os usuários, incluindo parceiros estratégicos como a Positivo e a IMC, e o Data Base, relativo ao uso do serviço. A aceitação destes Termos é obrigatória para o acesso e uso do Data Base.
        </Typography>
      </Box>
    </Container>
  );
}
