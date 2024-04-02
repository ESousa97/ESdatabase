import React from 'react';
import DOMPurify from 'dompurify';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css'; // Importe o arquivo CSS de estilos

function getImagePath(imageFileName) {
  const [folder] = imageFileName.split('__');
  return `/Assets/${folder}/${imageFileName}`;
}

function ProcedureDetails({ procedure }) {
  if (!procedure) return null;

  // Função para criar marcação HTML segura
  function createMarkup(html) {
    // Substitui as tags pelo equivalente com a classe CSS aplicada
    let modifiedHtml = html
      .replace(/<table>/g, `<table class="${styles.table}">`)
      .replace(/<thead>/g, `<thead class="${styles.thead}">`)
      .replace(/<tr>/g, `<tr class="${styles.tr}">`)
      .replace(/<th>/g, `<th class="${styles.th}">`)
      .replace(/<td>/g, `<td class="${styles.td}">`); // Assumindo que você também tenha estilos para 'td' em seu CSS
  
    return { __html: DOMPurify.sanitize(modifiedHtml) };
  }
  // Função para copiar o conteúdo para a área de transferência
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Conteúdo copiado para a área de transferência!');
      })
      .catch((error) => console.error('Erro ao copiar o conteúdo:', error));
  };
  

  // Processa cada parte do conteúdo, verificando por imagens e aplicando formatações
  const processedContent = procedure.conteudo.split('\n').map((part, index) => {
    const imageMatch = part.match(/(IMC\d+__\d+\.png)/);
    const linkMatch = part.match(/\[([^\]]+)\]\((http[^)]+)\)/);
    const copyMatch = part.match(/@@(.*?)@@/);

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
    } else if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      return (
        <div key={index} style={{ margin: '16px 0' }}>
          <Button 
            href={linkUrl} 
            target="_blank"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              padding: '8px 16px',
              margin: '8px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            {linkText}
          </Button>
        </div>
      );
    } else if (copyMatch) {
      const contentToCopy = copyMatch[1];
      return (
        <div key={index} style={{ margin: '16px 0' }}>
          <Button 
            onClick={() => handleCopy(contentToCopy)} 
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              borderRadius: '5px',
              padding: '8px 16px',
              margin: '8px',
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            {contentToCopy}
          </Button>
        </div>
      );

    } else {
      let modifiedPart = part
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrito
        .replace(/!!(.*?)!!/g, '<span style="color: red;">$1</span>'); // Texto vermelho

      return (
        <div key={index} style={{ margin: '16px 0' }} dangerouslySetInnerHTML={createMarkup(modifiedPart)} />
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
