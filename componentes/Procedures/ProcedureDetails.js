import React from 'react';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledButton, StyledCopyButton, ImageContainer, ContentContainer } from './ProcedureDetailsStyles';

function getImagePath(imageFileName) {
  const [folder] = imageFileName.split('__');
  return `/Assets/${folder}/${imageFileName}`;
}

function ProcedureDetails({ procedure }) {
  if (!procedure) return null;

  function createMarkup(html) {
    let modifiedHtml = html
      .replace(/<table>/g, `<table class="table">`)
      .replace(/<thead>/g, `<thead class="thead">`)
      .replace(/<tr>/g, `<tr class="tr">`)
      .replace(/<th>/g, `<th class="th">`)
      .replace(/<td>/g, `<td class="td">`);
  
    return { __html: DOMPurify.sanitize(modifiedHtml) };
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => toast.success('Conteúdo copiado para a área de transferência!'))
      .catch((error) => console.error('Erro ao copiar o conteúdo:', error));
  };

  const processedContent = procedure.conteudo.split('\n').map((part, index) => {
    const imageMatch = part.match(/(IMC\d+__\d+\.png)/);
    const linkMatch = part.match(/\[([^\]]+)\]\((http[^)]+)\)/);
    const copyMatch = part.match(/@@(.*?)@@/);

    if (imageMatch) {
      const imagePath = getImagePath(imageMatch[0]);
      return (
        <ImageContainer key={index}>
          <img src={imagePath} alt={`Imagem ${imageMatch[0]}`} style={{ maxWidth: '100%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        </ImageContainer>
      );
    } else if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      return (
        <ContentContainer key={index}>
          <StyledButton href={linkUrl} target="_blank">{linkText}</StyledButton>
        </ContentContainer>
      );
    } else if (copyMatch) {
      const contentToCopy = copyMatch[1];
      return (
        <ContentContainer key={index}>
          <StyledCopyButton onClick={() => handleCopy(contentToCopy)}>{contentToCopy}</StyledCopyButton>
        </ContentContainer>
      );
    } else {
      let modifiedPart = part
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/!!(.*?)!!/g, '<span style="color: red;">$1</span>');

      return (
        <ContentContainer key={index} dangerouslySetInnerHTML={createMarkup(modifiedPart)} />
      );
    }
  });

  return (
    <div>
      <ToastContainer autoClose={5000} />
      <h1>{procedure.titulo}</h1>
      {processedContent}
    </div>
  );
}

export default ProcedureDetails;
