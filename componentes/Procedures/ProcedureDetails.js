import React from 'react';
import DOMPurify from 'dompurify';

function getImagePath(imageFileName) {
  const [folder] = imageFileName.split('__');
  return `/Assets/${folder}/${imageFileName}`;
}

function ProcedureDetails({ procedure }) {
  if (!procedure) return null;

  // Função para criar marcação HTML segura
  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  // Processa cada parte do conteúdo, verificando por imagens e aplicando formatações
  const processedContent = procedure.conteudo.split('\n').map((part, index) => {
    const imageMatch = part.match(/(IMC\d+__\d+\.png)/);

    // Formatação de texto e imagem
    let modifiedPart = part
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrito
      .replace(/!!(.*?)!!/g, '<span style="color: red;">$1</span>'); // Texto vermelho

    // Se uma imagem é encontrada, renderiza a tag <img>
    if (imageMatch) {
      const imagePath = getImagePath(imageMatch[0]);
      return (
        <div key={index} style={{ margin: '16px 0' }}> {/* Espaçamento para imagens */}
          <img
            src={imagePath}
            alt={`Imagem ${imageMatch[0]}`}
            style={{ maxWidth: '100%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          />
        </div>
      );
    } else {
      // Se não é uma imagem, retorna um div com a parte modificada, sanitizada e com espaçamento
      return (
        <div key={index} style={{ margin: '16px 0' }} dangerouslySetInnerHTML={createMarkup(modifiedPart)} />
      );
    }
  });

  return (
    <div>
      <h1>{procedure.titulo}</h1>
      {processedContent}
    </div>
  );
}

export default ProcedureDetails;
