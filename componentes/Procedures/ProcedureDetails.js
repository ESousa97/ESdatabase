import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CircularProgress,
  Box,
  Button,
  Chip,
  Typography,
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Code as CodeIcon,
  ContentCopy as CopyIcon,
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Link as LinkIcon,
  Category as CategoryIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import {
  StyledButton,
  StyledCopyButton,
  ImageContainer,
  ContentContainer,
} from './ProcedureDetailsStyles';

function ProcedureDetails({ procedure }) {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState(new Set());

  const IMG_WIDTH = 640;

  useEffect(() => {
    if (procedure) setLoading(false);
  }, [procedure]);

  const handleLoadVideo = (videoId) => setVideoLoaded(videoId);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() =>
        toast.success('Código copiado para a área de transferência!', {
          position: 'bottom-right',
        }),
      )
      .catch((error) => console.error('Erro ao copiar o conteúdo:', error));
  };

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const renderVideo = (videoId) =>
    videoLoaded === videoId ? (
      <Card elevation={4} sx={{ margin: '20px 0', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            position: 'relative',
            height: isExpanded ? '85vh' : '400px',
            transition: 'height 0.8s ease',
          }}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&vq=hd1080`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={toggleExpand}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              textTransform: 'none',
            }}
          >
            {isExpanded ? 'Minimizar' : 'Expandir'}
          </Button>
        </div>
      </Card>
    ) : (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<PlayIcon />}
          onClick={() => handleLoadVideo(videoId)}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            py: 1,
          }}
        >
          Carregar Vídeo Tutorial
        </Button>
      </Box>
    );

  const renderCodeBlock = (code) => (
    <Card
      elevation={2}
      sx={{
        margin: '16px 0',
        bgcolor: 'grey.900',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          bgcolor: 'grey.800',
          borderBottom: 1,
          borderColor: 'grey.700',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon color="success" sx={{ fontSize: 20 }} />
          <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
            Código
          </Typography>
        </Box>
        <Button
          size="small"
          color="success"
          startIcon={<CopyIcon />}
          onClick={() => handleCopy(code)}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Copiar
        </Button>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography
          component="pre"
          sx={{
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'grey.100',
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {code}
        </Typography>
      </Box>
    </Card>
  );

  const createMarkup = (html) => {
    let modifiedHtml = html
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #2e7d32; font-weight: 700;">$1</strong>')
      .replace(/!!(.*?)!!/g, '<span style="color: #d32f2f; font-weight: 600;">$1</span>')
      .replace(/●/g, '<span style="color: #1976d2; font-weight: bold;">●</span>')
      .replace(/➤/g, '<span style="color: #ed6c02; font-size: 1.2em; font-weight: bold;">➤</span>')
      .replace(/\\n/g, '<br />')
      .replace(
        /<table>/g,
        '<table class="table" style="width: 100%; border-collapse: collapse; margin: 16px 0;">',
      )
      .replace(/<thead>/g, '<thead class="thead" style="background: #f5f5f5;">')
      .replace(/<tr>/g, '<tr class="tr" style="border-bottom: 1px solid #ddd;">')
      .replace(
        /<th>/g,
        '<th class="th" style="padding: 12px; text-align: left; font-weight: 600;">',
      )
      .replace(/<td>/g, '<td class="td" style="padding: 12px;">');
    return { __html: DOMPurify.sanitize(modifiedHtml) };
  };

  function processLine(part, index) {
    if (/^(public\/)?Assets\/IMC\d{4}\/?$/i.test(part.trim())) return null;

    // Detectar seções principais (linhas que começam com ➤)
    if (part.trim().startsWith('➤ **') && part.includes('**:')) {
      const sectionTitle = part.replace('➤ **', '').replace('**:', '').trim();
      const isExpanded = expandedSections.has(index);

      return (
        <Accordion
          key={index}
          expanded={isExpanded}
          onChange={() => toggleSection(index)}
          sx={{
            margin: '16px 0',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:before': { display: 'none' },
            borderRadius: 2,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.contrastText' }} />}
            sx={{
              '& .MuiAccordionSummary-content': { margin: '16px 0' },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {sectionTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Divider sx={{ bgcolor: 'primary.contrastText', opacity: 0.2 }} />
          </AccordionDetails>
        </Accordion>
      );
    }

    const pattern = [
      /(https:\/\/images\.unsplash\.com\/[^\s)]+)/i.source,
      /(public\/Assets\/[^\s)]+\.png)/i.source,
      /(Assets\/[^\s)]+\.png)/i.source,
      /(IMC\d{4}__\d+\.png)/i.source,
      /@@(.+?)@@/.source,
      /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/.source,
      /https?:\/\/(?:youtu\.be)\/([a-zA-Z0-9_-]+)/.source,
      /\[([^\]]+)\]\((http[^\)]+)\)/.source,
    ].join('|');
    const globalPattern = new RegExp(pattern, 'gi');

    let tokens = [];
    let line = part;
    let match,
      lastIndex = 0;
    while ((match = globalPattern.exec(line)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: 'text', value: line.substring(lastIndex, match.index) });
      }
      if (match[1]) {
        tokens.push({ type: 'unsplash', value: match[1] });
      } else if (match[2]) {
        tokens.push({ type: 'image', value: match[2] });
      } else if (match[3]) {
        tokens.push({ type: 'image', value: match[3] });
      } else if (match[4]) {
        tokens.push({ type: 'image', value: `/Assets/${match[4].split('__')[0]}/${match[4]}` });
      } else if (match[5] !== undefined) {
        tokens.push({ type: 'copy', value: match[5] });
      } else if (match[6]) {
        tokens.push({ type: 'video', value: match[6] });
      } else if (match[7]) {
        tokens.push({ type: 'video', value: match[7] });
      } else if (match[8] && match[9]) {
        tokens.push({ type: 'link', text: match[8], href: match[9] });
      }
      lastIndex = globalPattern.lastIndex;
    }
    if (lastIndex < line.length) {
      tokens.push({ type: 'text', value: line.substring(lastIndex) });
    }

    return (
      <ContentContainer key={index}>
        {tokens.map((token, i) => {
          if (token.type === 'unsplash') {
            return (
              <Card
                key={i}
                elevation={3}
                sx={{ margin: '24px 0', borderRadius: 2, overflow: 'hidden' }}
              >
                <Image
                  src={token.value}
                  alt="Imagem do projeto"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    maxWidth: IMG_WIDTH,
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto',
                    objectFit: 'cover',
                  }}
                  unoptimized
                />
              </Card>
            );
          }
          if (token.type === 'image') {
            let imagePath = token.value.replace(/^public\//, '');
            if (!imagePath.startsWith('/')) imagePath = '/' + imagePath;
            return (
              <ImageContainer key={i}>
                <Image
                  src={imagePath}
                  alt={`Imagem ${token.value}`}
                  width={800}
                  height={600}
                  style={{
                    width: IMG_WIDTH,
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '24px auto',
                    borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    objectFit: 'contain',
                  }}
                  unoptimized
                />
              </ImageContainer>
            );
          }
          if (token.type === 'copy') {
            return renderCodeBlock(token.value);
          }
          if (token.type === 'video') {
            return renderVideo(token.value);
          }
          if (token.type === 'link') {
            return (
              <Button
                key={i}
                variant="contained"
                color="info"
                startIcon={<LinkIcon />}
                href={token.href}
                target="_blank"
                sx={{
                  margin: '8px 4px',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {token.text}
              </Button>
            );
          }
          if (token.type === 'text') {
            if (/^(public\/)?Assets\/[^\s)]+\.png$/i.test(token.value.trim())) return null;
            return token.value.trim() !== '' ? (
              <Typography
                key={i}
                component="div"
                dangerouslySetInnerHTML={createMarkup(token.value)}
                sx={{
                  paddingX: 2,
                  marginBottom: 1,
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'text.primary',
                  '& strong': { color: 'success.main' },
                  '& span[style*="color: #1976d2"]': { marginRight: 1 },
                }}
              />
            ) : null;
          }
          return null;
        })}
      </ContentContainer>
    );
  }

  const processedContent = procedure?.conteudo
    ? procedure.conteudo.split('\n').map(processLine)
    : null;

  if (loading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <ToastContainer autoClose={3000} position="bottom-right" />

      {/* Header do Projeto */}
      <Card
        elevation={4}
        sx={{
          marginBottom: 4,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              marginBottom: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {procedure.titulo}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              marginBottom: 3,
              lineHeight: 1.6,
            }}
          >
            {procedure.descricao}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip
              icon={<CategoryIcon />}
              label={procedure.categoria}
              color="secondary"
              variant="filled"
              sx={{
                fontWeight: 600,
              }}
            />

            <Chip
              icon={<ScheduleIcon />}
              label={new Date(procedure.data_criacao).toLocaleDateString('pt-BR')}
              color="info"
              variant="filled"
              sx={{
                fontWeight: 600,
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Conteúdo do Projeto */}
      <Card
        elevation={2}
        sx={{
          bgcolor: 'background.paper',
          minHeight: '60vh',
        }}
      >
        <CardContent sx={{ padding: 3 }}>{processedContent}</CardContent>
      </Card>
    </Box>
  );
}

export default ProcedureDetails;
