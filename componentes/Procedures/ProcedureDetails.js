import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress, Box } from '@mui/material';
import { StyledButton, StyledCopyButton, ImageContainer, ContentContainer } from './ProcedureDetailsStyles';
import styles from './styles.module.css';

function getImagePath(imageFileName) {
  const [folder] = imageFileName.split('__');
  return `/Assets/${folder}/${imageFileName}`;
}

function createMarkup(html) {
  let modifiedHtml = html
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/!!(.*?)!!/g, '<span style="color: red;">$1</span>')
    .replace(/<table>/g, `<table class="${styles.table}">`)
    .replace(/<thead>/g, `<thead class="${styles.thead}">`)
    .replace(/<tr>/g, `<tr class="${styles.tr}">`)
    .replace(/<th>/g, `<th class="${styles.th}">`)
    .replace(/<td>/g, `<td class="${styles.td}">`);

  return { __html: DOMPurify.sanitize(modifiedHtml) };
}

function ProcedureDetails({ procedure }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (procedure) {
      setLoading(false);
    }
  }, [procedure]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado para a área de transferência!'))
      .catch((error) => console.error('Erro ao copiar o conteúdo:', error));
  };

  function processContent(part, index) {
    const splitContent = part.split(/@@(.*?)@@/);
    return splitContent.map((content, subIndex) => {
      if (subIndex % 2 === 0) {
        // Conteúdo fora dos marcadores @@
        if (content.trim() === '') return null; // Evita renderizar spans vazios
        return <span key={`text-${index}-${subIndex}`} dangerouslySetInnerHTML={createMarkup(content)} />;
      } else {
        // Conteúdo dentro dos marcadores @@ (destinado a cópia)
        return <StyledCopyButton key={`copy-${index}-${subIndex}`} onClick={() => handleCopy(content)}>{content}</StyledCopyButton>;
      }
    });
  }

  const processedContent = procedure?.conteudo.split('\n').map((part, index) => {
    if (part.includes('@@')) {
      // Se a parte inclui @@, processa para separar o texto de botões de cópia
      return (
        <ContentContainer key={index}>
          {processContent(part, index)}
        </ContentContainer>
      );
    }
    // Para imagens e links, a lógica permanece a mesma
    const imageMatch = part.match(/(IMC\d+__\d+\.png)/);
    if (imageMatch) {
      const imagePath = getImagePath(imageMatch[0]);
      return (
        <ImageContainer key={index}>
          <img src={imagePath} alt={`Imagem ${imageMatch[0]}`} style={{ maxWidth: '100%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        </ImageContainer>
      );
    }

    const linkMatch = part.match(/\[([^\]]+)\]\((http[^)]+)\)/);
    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      return (
        <ContentContainer key={index}>
          <StyledButton href={linkUrl} target="_blank">{linkText}</StyledButton>
        </ContentContainer>
      );
    }

    // Para texto que não seja nem imagem, nem link, nem marcado para cópia
    return (
      <ContentContainer key={`text-${index}`} dangerouslySetInnerHTML={createMarkup(part)} />
    );
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
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
