// pages/terms.js

import * as React from 'react';
import Head from 'next/head';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Chip, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { 
  Security, 
  Business, 
  Gavel, 
  ContactMail, 
  Shield, 
  CheckCircle 
} from '@mui/icons-material';

export default function TermsOfService() {
  const theme = useTheme();

  const termsData = [
    {
      title: "Natureza do Projeto",
      icon: <CheckCircle color="primary" />,
      content: "O Data Base é um projeto de demonstração e portfólio disponibilizado como código aberto. Não se trata de um serviço comercial ativo, mas sim de uma vitrine técnica para fins educacionais e de demonstração de competências em desenvolvimento."
    },
    {
      title: "Licença Open Source",
      icon: <Gavel color="secondary" />,
      content: "Este projeto é disponibilizado sob licença de código aberto, permitindo uso, modificação e distribuição para fins educacionais, de aprendizado e desenvolvimento pessoal. Consulte o arquivo LICENSE no repositório GitHub para detalhes específicos."
    },
    {
      title: "Finalidade de Demonstração",
      icon: <Business color="info" />,
      content: "O projeto serve como demonstração técnica e portfólio de desenvolvimento. Qualquer pessoa pode visualizar, estudar e utilizar o código como referência para projetos similares ou para aprendizado de tecnologias implementadas."
    },
    {
      title: "Uso Responsável",
      icon: <Security color="warning" />,
      content: "Embora o código seja aberto, recomenda-se uso responsável e ético. Não utilizem este projeto para atividades ilegais, maliciosas ou que violem direitos de terceiros. O autor não se responsabiliza por usos inadequados do código."
    },
    {
      title: "Contribuições",
      icon: <Shield color="success" />,
      content: "Contribuições ao projeto são bem-vindas através de pull requests no GitHub. Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto."
    },
    {
      title: "Propriedade Intelectual",
      icon: <Gavel color="error" />,
      content: "Embora o código seja open source, o conceito original e design do Data Base permanecem como propriedade intelectual do autor. O uso do código deve respeitar os termos da licença especificada no repositório."
    },
    {
      title: "Isenção de Responsabilidade",
      icon: <CheckCircle color="primary" />,
      content: "Este projeto é fornecido \"como está\", sem garantias de funcionamento ou suporte. O autor não se responsabiliza por problemas decorrentes do uso do código ou por danos causados por implementações baseadas neste projeto."
    },
    {
      title: "Suporte e Manutenção",
      icon: <Shield color="warning" />,
      content: "Como projeto de portfólio, não há garantia de suporte contínuo ou atualizações regulares. O projeto pode ser arquivado ou modificado conforme necessário para fins de demonstração."
    }
  ];

  const legislacao = [
    "Next.js e React para desenvolvimento frontend",
    "Material-UI para interface de usuário", 
    "Autenticação 2FA com Microsoft e Google",
    "Arquitetura de procedimentos operacionais",
    "Práticas de desenvolvimento seguro"
  ];

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Termos de Uso e Serviço - Data Base</title>
        <meta name="description" content="Termos de Uso e Serviço da plataforma Data Base" />
      </Head>
      
      {/* Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          p: 4,
          mb: 4,
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpolygon points="10 0 20 10 10 20 0 10"/%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" textAlign="center">
            Termos de Uso e Serviço
          </Typography>
          <Typography variant="h6" textAlign="center" sx={{ opacity: 0.9 }}>
            Plataforma Data Base
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Chip 
              label="Última Atualização: 14.07.2025" 
              sx={{ 
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                color: 'white',
                fontWeight: 'bold'
              }} 
            />
          </Box>
        </Box>
      </Paper>

      {/* Introdução */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
            Projeto Open Source - Data Base
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            Este é um projeto de demonstração e portfólio para consulta e gestão de procedimentos operacionais para sistemas e tecnologias relacionadas. O projeto está disponível como código aberto no GitHub para fins educacionais e de demonstração técnica.
          </Typography>
          <Typography variant="body2" sx={{ 
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            p: 2,
            borderRadius: 1,
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            fontStyle: 'italic',
            color: theme.palette.warning.dark,
            mb: 2
          }}>
            <strong>Aviso:</strong> Este projeto foi encerrado como serviço comercial. As parcerias anteriores foram finalizadas em comum acordo entre as partes.
          </Typography>
          <Typography variant="body2" sx={{ 
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            p: 2,
            borderRadius: 1,
            borderLeft: `4px solid ${theme.palette.success.main}`,
            fontStyle: 'italic',
            color: theme.palette.success.dark
          }}>
            <strong>Open Source:</strong> O código está disponível publicamente no GitHub sob licença de uso livre para fins educacionais e de desenvolvimento.
          </Typography>
        </CardContent>
      </Card>

      {/* Seções dos Termos */}
      <Box sx={{ mb: 4 }}>
        {termsData.map((term, index) => (
          <Card 
            key={index} 
            elevation={1} 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                elevation: 3,
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[8]
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {term.icon}
                <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold', color: theme.palette.text.primary }}>
                  {term.title}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ lineHeight: 1.7, color: theme.palette.text.secondary }}>
                {term.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Contato */}
      <Card 
        elevation={3} 
        sx={{ 
          mb: 4, 
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <ContactMail color="primary" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Contato e Repositório
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.8 }}>
            Para questões sobre o projeto, sugestões ou contribuições, acesse o repositório no GitHub ou entre em contato:
          </Typography>
          <Chip 
            label="sousa3086@outlook.com"
            component="a"
            href="mailto:sousa3086@outlook.com"
            target="_blank"
            clickable
            color="primary"
            sx={{ 
              fontSize: '1.1rem',
              p: 2,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'scale(1.05)'
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Conclusão */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
            Projeto de Portfólio
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: 'italic' }}>
            Este projeto representa uma demonstração técnica das competências em desenvolvimento web e arquitetura de sistemas. O Data Base foi criado como projeto de portfólio e está disponível publicamente no GitHub para estudo, aprendizado e inspiração para outros desenvolvedores. Sinta-se livre para explorar, aprender e contribuir com o projeto.
          </Typography>
        </CardContent>
      </Card>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body2" color="text.secondary">
          © 2024 Data Base - Projeto Open Source. Disponível no GitHub.
        </Typography>
      </Box>
    </Container>
  );
}