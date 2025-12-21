// pages/privacy.js

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
  alpha,
  Grid,
  Alert,
} from '@mui/material';
import {
  Security,
  Shield,
  Visibility,
  Block,
  Code,
  CheckCircle,
  Cancel,
  GitHub,
  Lock,
  Public,
  School,
} from '@mui/icons-material';

export default function PrivacyPolicy() {
  const theme = useTheme();

  const noDataCollected = [
    {
      item: 'Dados Pessoais',
      description: 'Nomes, emails, telefones ou qualquer informação identificável',
    },
    { item: 'Dados de Navegação', description: 'Histórico, cookies, sessões ou preferências' },
    { item: 'Dados de Localização', description: 'IP, geolocalização ou informações regionais' },
    { item: 'Dados Técnicos', description: 'Dispositivo, sistema operacional ou especificações' },
    { item: 'Dados de Uso', description: 'Clicks, tempo de permanência ou interações' },
    { item: 'Dados de Autenticação', description: 'Logins, senhas ou credenciais' },
    { item: 'Analytics', description: 'Métricas de desempenho ou estatísticas de uso' },
  ];

  const privacyPrinciples = [
    {
      title: 'Minimização de Dados',
      icon: <Block color="error" />,
      description:
        'Coletamos ZERO dados dos usuários. Não há formulários que armazenem informações. Interface puramente demonstrativa.',
    },
    {
      title: 'Transparência Total',
      icon: <Visibility color="primary" />,
      description:
        'Código fonte aberto no GitHub (https://github.com/ESousa97/ESdatabase). Arquitetura visível para todos. Sem componentes ocultos de tracking.',
    },
    {
      title: 'Segurança por Ausência',
      icon: <Shield color="success" />,
      description:
        'Não há dados para serem comprometidos. Sem riscos de vazamento de informações. Proteção pela não-existência de dados.',
    },
  ];

  const userRights = [
    'Direito ao Esquecimento: Não há dados para esquecer',
    'Direito de Acesso: Não há dados para acessar',
    'Direito de Portabilidade: Não há dados para exportar',
    'Direito de Retificação: Não há dados para corrigir',
    'Direito de Exclusão: Não há dados para excluir',
  ];

  const regulations = [
    {
      name: '🇧🇷 LGPD (Brasil)',
      status: 'Não aplicável (sem coleta de dados)',
      details: ['Transparência total sobre práticas', 'Princípio da minimização respeitado'],
    },
    {
      name: '🇪🇺 GDPR (Europa)',
      status: 'Não aplicável (sem processamento de dados)',
      details: ['Privacy by design implementado', 'Direitos fundamentais respeitados'],
    },
    {
      name: '🇺🇸 CCPA (Califórnia)',
      status: 'Não aplicável (sem dados de consumidores)',
      details: ['Transparência sobre práticas', 'Sem venda de dados pessoais'],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Política de Privacidade - Data Base</title>
        <meta
          name="description"
          content="Política de Privacidade do projeto open source Data Base"
        />
      </Head>

      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
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
            background:
              'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpolygon points="10 0 20 10 10 20 0 10"/%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Lock sx={{ fontSize: 48, mr: 2 }} />
            <Typography variant="h3" component="h1" fontWeight="bold" textAlign="center">
              Política de Privacidade
            </Typography>
          </Box>
          <Typography variant="h6" textAlign="center" sx={{ opacity: 0.9 }}>
            Projeto Open Source - Zero Coleta de Dados
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Chip
              label="Última Atualização: 14.07.2025"
              sx={{
                backgroundColor: alpha(theme.palette.common.white, 0.2),
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Resumo Principal */}
      <Alert
        severity="success"
        sx={{
          mb: 4,
          fontSize: '1.1rem',
          '& .MuiAlert-message': { width: '100%' },
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">
          🎯 Resumo Executivo
        </Typography>
        <Typography>
          <strong>O Data Base NÃO coleta, armazena ou processa NENHUM dado pessoal.</strong> Este é
          um projeto de demonstração open source hospedado no GitHub, criado exclusivamente para
          fins educacionais e de portfólio. Sua privacidade é garantida pela arquitetura
          zero-tracking.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Chip
            label="📂 Ver Código no GitHub"
            component="a"
            href="https://github.com/ESousa97/ESdatabase"
            target="_blank"
            clickable
            size="small"
            sx={{
              backgroundColor: alpha(theme.palette.success.dark, 0.1),
              '&:hover': { backgroundColor: alpha(theme.palette.success.dark, 0.2) },
            }}
          />
        </Box>
      </Alert>

      {/* O Que NÃO Coletamos */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Cancel color="error" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold', color: 'error.main' }}>
              O Que NÃO Coletamos
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {noDataCollected.map((data, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                    borderLeft: `3px solid ${theme.palette.error.main}`,
                  }}
                >
                  <Typography variant="h6" color="error.main" fontWeight="bold" gutterBottom>
                    🚫 {data.item}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Princípios de Privacidade */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 3 }}>
          🛡️ Princípios de Privacidade
        </Typography>

        {privacyPrinciples.map((principle, index) => (
          <Card
            key={index}
            elevation={1}
            sx={{
              mb: 2,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                elevation: 3,
                transform: 'translateY(-2px)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {principle.icon}
                <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>
                  {principle.title}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.7, color: theme.palette.text.secondary }}
              >
                {principle.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Demonstração 2FA */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Security color="warning" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold', color: 'warning.main' }}>
              Sistema 2FA (Demonstrativo)
            </Typography>
          </Box>

          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body1" fontWeight="bold">
              ⚠️ IMPORTANTE: Sistema de Autenticação Apenas Demonstrativo
            </Typography>
          </Alert>

          <Typography variant="body1" paragraph>
            Embora o projeto demonstre integração com Microsoft Authentication e Google
            Authentication:
          </Typography>

          <List>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText primary="Não coletamos credenciais reais" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText primary="Não armazenamos tokens de acesso" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText primary="Não processamos autenticações reais" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText primary="Apenas demonstramos a implementação técnica" />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Direitos do Usuário */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Shield color="success" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold', color: 'success.main' }}>
              Seus Direitos Garantidos
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Como não coletamos dados, todos os seus direitos são automaticamente garantidos:
          </Typography>

          <List>
            {userRights.map((right, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={right}
                  sx={{ '& .MuiListItemText-primary': { fontWeight: 500 } }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Conformidade Legal */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Public color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold', color: 'primary.main' }}>
              Conformidade Legal
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {regulations.map((reg, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 3,
                    height: '100%',
                    backgroundColor: alpha(theme.palette.success.main, 0.05),
                    borderTop: `4px solid ${theme.palette.success.main}`,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {reg.name}
                  </Typography>
                  <Chip label={reg.status} color="success" size="small" sx={{ mb: 2 }} />
                  <List dense>
                    {reg.details.map((detail, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckCircle color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={detail}
                          primaryTypographyProps={{ fontSize: '0.9rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Projeto Educacional */}
      <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <School color="info" sx={{ fontSize: 32 }} />
            <Typography variant="h5" sx={{ ml: 2, fontWeight: 'bold', color: 'info.main' }}>
              Projeto Educacional
            </Typography>
          </Box>

          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Este projeto serve para demonstrar:
          </Typography>

          <Grid container spacing={2}>
            {[
              '🛠️ Habilidades Técnicas: Implementação de sistemas seguros',
              '🔒 Melhores Práticas: Privacy by design',
              '📚 Aprendizado: Referência para outros desenvolvedores',
              '🏆 Portfólio: Showcase de competências',
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: alpha(theme.palette.info.main, 0.05),
                  }}
                >
                  <Typography variant="body1" fontWeight="500">
                    {item}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Contato */}
      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.1)} 100%)`,
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <GitHub color="primary" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Transparência e Contato
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.8 }}>
            Para dúvidas sobre privacidade, auditoria do código ou contribuições, acesse nosso
            repositório GitHub ou entre em contato:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label="sousa3086@outlook.com"
              component="a"
              href="mailto:sousa3086@outlook.com"
              target="_blank"
              clickable
              color="primary"
              sx={{
                fontSize: '1rem',
                p: 2,
                fontWeight: 'bold',
              }}
            />
            <Chip
              label="Repositório GitHub"
              component="a"
              href="https://github.com/ESousa97/ESdatabase"
              target="_blank"
              clickable
              color="secondary"
              sx={{
                fontSize: '1rem',
                p: 2,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          🔒 Sua privacidade é nossa prioridade - através da não-coleta de dados, garantimos
          proteção total.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          © 2024 Data Base Project - Open Source com Privacidade por Design
        </Typography>
      </Box>
    </Container>
  );
}
