// pages/privacy.js

import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Typography, Box, Button } from '@mui/material';

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
          Última Atualização: 05.04.2024
        </Typography>
        <Typography paragraph>
          Bem-vindo ao Data Base. Estamos comprometidos em proteger sua privacidade e em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD), o Código de Defesa do Consumidor, o Marco Civil da Internet, e outras legislações aplicáveis.
        </Typography>
        <Typography paragraph>
          Esta Política de Privacidade aplica-se a todos os usuários, incluindo parceiros estratégicos como a Positivo e a International Meal Company (IMC), e detalha como suas informações são coletadas, usadas, e protegidas ao acessar ou usar os serviços do Data Base.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Informações Coletadas
        </Typography>
        <Typography paragraph>
          <strong>Dados de Acesso:</strong> Utilizamos serviços de autenticação 2FA fornecidos pela Microsoft e Google. Não armazenamos suas credenciais de login ou senhas.
        </Typography>
        <Typography paragraph>
          <strong>Dados de Uso:</strong> Coletamos informações sobre como você acessa e usa o Data Base, incluindo ações realizadas dentro da plataforma.
        </Typography>
        <Typography paragraph>
          <strong>Informações de Contato:</strong> Se você entrar em contato conosco diretamente, podemos receber informações adicionais sobre você, como seu nome, endereço de e-mail, número de telefone, o conteúdo da mensagem e/ou anexos que você nos enviar, e qualquer outra informação que você escolha fornecer.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Uso das Informações
        </Typography>
        <Typography paragraph>
          Utilizamos as informações coletadas para:
        </Typography>
        <ul>
          <li>Fornecer, operar e manter o Data Base.</li>
          <li>Melhorar, personalizar e expandir o Data Base.</li>
          <li>Entender e analisar como você utiliza o Data Base.</li>
          <li>Desenvolver novos produtos, serviços, funcionalidades e funcionalidades.</li>
          <li>Comunicar com você, diretamente ou por meio de um dos nossos parceiros, incluindo para atendimento ao cliente, para fornecer atualizações e outras informações relacionadas ao serviço, e para fins de marketing e promoção.</li>
          <li>Enviar e-mails e outras comunicações que sejam de seu interesse.</li>
        </ul>
        <Typography variant="h6" component="h2" gutterBottom>
          Compartilhamento de Informações
        </Typography>
        <Typography paragraph>
          As informações dos usuários podem ser compartilhadas com:
        </Typography>
        <ul>
          <li>Parceiros estratégicos, como a Positivo e a IMC, sob estrita observância desta política e com o objetivo de fornecer o serviço acordado.</li>
          <li>Fornecedores de serviços que nos auxiliam na prestação do Data Base.</li>
          <li>Para cumprimento de qualquer lei, regulamento, processo legal ou solicitação governamental aplicável.</li>
        </ul>
        <Typography variant="h6" component="h2" gutterBottom>
          Segurança das Informações
        </Typography>
        <Typography paragraph>
          Empregamos medidas de segurança robustas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou método de armazenamento eletrônico é 100% seguro, e não podemos garantir sua segurança absoluta.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Seus Direitos
        </Typography>
        <Typography paragraph>
          Você tem o direito de acessar, corrigir, excluir ou opor-se ao processamento de suas informações pessoais que coletamos. Para exercer esses direitos, entre em contato conosco no endereço fornecido abaixo.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Contato
        </Typography>
        <Typography paragraph>
          Para quaisquer questões relacionadas a esta Política de Privacidade, entre em contato pelo e-mail <a href="mailto:sousa3086@outlook.com" target='_blank'>sousa3086@outlook.com</a>.
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Alterações à Política de Privacidade
        </Typography>
        <Typography paragraph>
          Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. Qualquer alteração será efetiva imediatamente após a publicação da política revisada no Data Base.
        </Typography>
        <Typography paragraph>
          Ao utilizar o Data Base, você concorda com a coleta e uso de informações em conformidade com esta Política de Privacidade.
        </Typography>
      </Box>
    </Container>
  );
}
