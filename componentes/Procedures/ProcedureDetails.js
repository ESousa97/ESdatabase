import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box, Button } from '@mui/material';
import { StyledButton, StyledCopyButton, ImageContainer, ContentContainer } from './ProcedureDetailsStyles';

function ProcedureDetails({ procedure }) {
  const [loading, setLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const IMG_WIDTH = 640; // Todas as imagens ficam no mesmo tamanho

  useEffect(() => {
    if (procedure) setLoading(false);
  }, [procedure]);

  const handleLoadVideo = (videoId) => setVideoLoaded(videoId);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado para a área de transferência!'))
      .catch((error) => console.error('Erro ao copiar o conteúdo:', error));
  };

  const renderVideo = (videoId) => (
    videoLoaded === videoId ? (
      <div style={{
        position: 'relative',
        height: isExpanded ? '85vh' : '30vh',
        transition: 'height 0.8s ease',
        boxShadow: '0 10px 10px rgba(0,0,0,0.1)',
        margin: '10px',
        borderRadius: '10px',
      }}>
        <iframe
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: '10px',
          }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&vq=hd1080`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <Button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#f50057',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            textTransform: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          variant="contained"
          onClick={toggleExpand}
        >
          {isExpanded ? 'Minimizar' : 'Expandir'}
        </Button>
      </div>
    ) : (
      <div style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        height: '4vh'
      }}>
        <Button variant="outlined" onClick={() => handleLoadVideo(videoId)} style={{
          padding: '5px 10px',
          fontSize: '16px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
        }}>
          Carregar Vídeo
        </Button>
      </div>
    )
  );

  const createMarkup = (html) => {
    let modifiedHtml = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/!!(.*?)!!/g, '<span style="color: red;">$1</span>')
      .replace(/\\n/g, '<br />')
      .replace(/<table>/g, `<table class="table">`)
      .replace(/<thead>/g, `<thead class="thead">`)
      .replace(/<tr>/g, `<tr class="tr">`)
      .replace(/<th>/g, `<th class="th">`)
      .replace(/<td>/g, `<td class="td">`);
    return { __html: DOMPurify.sanitize(modifiedHtml) };
  };

  // Para imagem do tipo IMC0001__1.png → /Assets/IMC0001/IMC0001__1.png
  const getImagePath = (imageFileName) => {
    const [folder] = imageFileName.split('__');
    return `/Assets/${folder}/${imageFileName}`;
  };

  function processLine(part, index) {
    // 1. Ignora diretórios puros (com ou sem barra, com ou sem public)
    if (/^(public\/)?Assets\/IMC\d{4}\/?$/i.test(part.trim())) {
      return null;
    }

    // 2. Ignora caminho puro de imagem (para evitar exibir como texto)
    if (/^(public\/)?Assets\/IMC\d{4}\/IMC\d{4}__\d+\.png$/i.test(part.trim())) {
      return null;
    }

    // 3. Tokeniza cada linha, pegando imagens (absoluto ou só nome), cópia, vídeo, links
    const tokens = [];
    let line = part;
    let match, lastIndex = 0;
    const pattern = [
      /(public\/Assets\/IMC\d{4}\/IMC\d{4}__\d+\.png)/i.source, // Caminho absoluto
      /(IMC\d{4}__\d+\.png)/i.source,                          // Apenas nome
      /@@(.*?)@@/.source,
      /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/.source,
      /\[([^\]]+)\]\((http[^\)]+)\)/.source
    ].join('|');
    const globalPattern = new RegExp(pattern, 'gi');

    while ((match = globalPattern.exec(line)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: 'text', value: line.substring(lastIndex, match.index) });
      }
      if (match[1]) { // Caminho absoluto imagem
        tokens.push({ type: 'imageAbs', value: match[1] });
      } else if (match[2]) { // Nome imagem
        tokens.push({ type: 'image', value: match[2] });
      } else if (match[3] !== undefined) { // @@copy@@
        tokens.push({ type: 'copy', value: match[3] });
      } else if (match[4]) { // YouTube
        tokens.push({ type: 'video', value: match[4] });
      } else if (match[5] && match[6]) { // Markdown link
        tokens.push({ type: 'link', text: match[5], href: match[6] });
      }
      lastIndex = globalPattern.lastIndex;
    }
    if (lastIndex < line.length) {
      tokens.push({ type: 'text', value: line.substring(lastIndex) });
    }

    return (
      <ContentContainer key={index}>
        {tokens.map((token, i) => {
          if (token.type === 'imageAbs') {
            const imagePath = '/' + token.value.replace(/^public\//, '');
            return (
              <ImageContainer key={i}>
                <img
                  src={imagePath}
                  alt={`Imagem ${imagePath}`}
                  style={{
                    width: IMG_WIDTH,
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '24px auto',
                    borderRadius: 12,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    objectFit: 'contain'
                  }}
                />
              </ImageContainer>
            );
          }
          if (token.type === 'image') {
            const imagePath = getImagePath(token.value);
            return (
              <ImageContainer key={i}>
                <img
                  src={imagePath}
                  alt={`Imagem ${token.value}`}
                  style={{
                    width: IMG_WIDTH,
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '24px auto',
                    borderRadius: 12,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    objectFit: 'contain'
                  }}
                />
              </ImageContainer>
            );
          }
          if (token.type === 'copy') {
            return (
              <Button key={i} variant="contained" size="small" color="success"
                onClick={() => handleCopy(token.value)}
                style={{
                  margin: '0 5px', borderRadius: 10, fontWeight: 600, background: '#23c97a'
                }}
              >{token.value}</Button>
            );
          }
          if (token.type === 'video') {
            return renderVideo(token.value);
          }
          if (token.type === 'link') {
            return (
              <StyledButton key={i} href={token.href} target="_blank">{token.text}</StyledButton>
            );
          }
          if (token.type === 'text') {
            // Garante que caminho puro de imagem não seja exibido nem como texto, em caso de erro de tokenização
            if (/^(public\/)?Assets\/IMC\d{4}\/IMC\d{4}__\d+\.png$/i.test(token.value.trim())) {
              return null;
            }
            return token.value.trim() !== ''
              ? <span key={i} dangerouslySetInnerHTML={createMarkup(token.value)} />
              : null;
          }
          return null;
        })}
      </ContentContainer>
    );
  }

  const processedContent = procedure?.conteudo.split('\n').map(processLine);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  return (
    <div>
      <ToastContainer autoClose={5000} />
      <h1>{procedure.titulo}</h1>
      {processedContent}
    </div>
  );
}

export default ProcedureDetails;
