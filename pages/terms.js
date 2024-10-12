import * as React from 'react';
import Head from 'next/head';
import { Container, Typography, Box } from '@mui/material';

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
          Última Atualização: 08.10.2024
        </Typography>
        <Typography paragraph>
          Bem-vindo ao Data Base, uma plataforma criada para a consulta e gestão de procedimentos operacionais para sistemas e tecnologias relacionadas. Este documento descreve os Termos de Uso e Serviço aplicáveis a todos os usuários que acessarem o Data Base.
        </Typography>

        <Typography paragraph>
          Este projeto foi descontinuado em **08 de outubro de 2024**. Embora tenha sido amplamente utilizado por empresas como **Positivo Brasil** e **International Meal Company (IMC)** durante seu período ativo, o serviço não está mais em operação, e não há garantias de funcionalidade contínua ou suporte técnico. Este documento serve apenas para referência sobre os termos que se aplicavam durante o período de atividade do projeto.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Aceitação dos Termos
        </Typography>
        <Typography paragraph>
          Durante o período ativo, ao acessar ou utilizar o Data Base, os usuários, incluindo representantes de empresas como a **Positivo** e a **IMC**, aceitavam integralmente os Termos de Uso. Com a descontinuação do projeto, os usuários são informados de que o sistema não está mais sob manutenção ou atualização, e qualquer acesso residual é feito por conta e risco dos usuários.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Uso Anterior
        </Typography>
        <Typography paragraph>
          Durante o período em que o projeto estava ativo, empresas como **Positivo** e **IMC** fizeram uso da plataforma por meio de contas corporativas, especificamente designadas para a gestão de seus procedimentos operacionais. O uso do serviço estava em conformidade com as leis aplicáveis, incluindo a LGPD e o Marco Civil da Internet.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Descontinuação do Serviço
        </Typography>
        <Typography paragraph>
          O Data Base foi oficialmente descontinuado em **08 de outubro de 2024**. A partir desta data, a plataforma não recebe mais atualizações ou suporte técnico, e funcionalidades previamente oferecidas podem não estar mais acessíveis ou funcionais. O projeto foi mantido publicamente apenas para fins de consulta e visualização, sem a garantia de que os dados ou funcionalidades estejam operacionais.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Isenção de Garantias e Limitação de Responsabilidade
        </Typography>
        <Typography paragraph>
          O Data Base é fornecido "como está", sem qualquer garantia quanto à sua funcionalidade ou continuidade. Não há garantias de segurança, desempenho ou precisão dos dados após a descontinuação. O Data Base, seus autores e colaboradores não serão responsáveis por quaisquer danos, diretos ou indiretos, decorrentes do uso ou incapacidade de uso do serviço, mesmo quando este estava ativo.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          Jurisdição e Lei Aplicável
        </Typography>
        <Typography paragraph>
          Estes Termos de Uso são regidos pelas leis do Brasil, especificamente do estado de São Paulo, município de São Bernardo do Campo. Qualquer litígio relacionado ao uso do serviço durante o seu período ativo deve ser resolvido nessa jurisdição.
        </Typography>
        <ul>
          <li>Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018;</li>
          <li>Código de Defesa do Consumidor (CDC), Lei nº 8.078/1990;</li>
          <li>Marco Civil da Internet, Lei nº 12.965/2014;</li>
          <li>Lei de Direitos Autorais, Lei nº 9.610/1998;</li>
          <li>Lei do Software, Lei nº 9.609/1998.</li>
        </ul>

        <Typography variant="h6" component="h2" gutterBottom>
          Contato
        </Typography>
        <Typography paragraph>
          Para quaisquer questões relacionadas a estes Termos de Uso ou ao projeto, entre em contato pelo e-mail <a href="mailto:sousa3086@outlook.com" target='_blank'>sousa3086@outlook.com</a>.
        </Typography>

        <Typography paragraph>
          Estes Termos de Uso refletem as condições durante o período de operação do Data Base e servem como referência para as empresas e usuários que utilizaram o serviço anteriormente. Após a descontinuação, o uso do serviço é realizado por conta e risco do usuário, sem qualquer garantia de suporte ou funcionalidade.
        </Typography>
      </Box>
    </Container>
  );
}
