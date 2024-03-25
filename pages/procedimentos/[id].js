import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DOMPurify from 'dompurify';
import ReactMarkdown from 'react-markdown';

const ProcedureDetails = ({ procedure }) => {
  const preprocessContent = (content) => {
    if (!content) return '';
    return DOMPurify.sanitize(content); // Sanitizar o conteúdo para evitar XSS
  };

  return (
    <div>
      <h2>{procedure.titulo}</h2>
      <p>{procedure.descricao}</p>
      <ReactMarkdown>{preprocessContent(procedure.conteudo)}</ReactMarkdown>
      {/* Adicione outros campos conforme necessário */}
    </div>
  );
};

const ProcedurePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [procedure, setProcedure] = useState(null);

  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        const response = await fetch(`https://server-json-eight.vercel.app/api/procedure.js/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar o procedimento');
        }
        const data = await response.json();
        setProcedure(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    if (id) {
      fetchProcedure();
    }
  }, [id]);

  return (
    <div>
      {procedure && <ProcedureDetails procedure={procedure} />}
    </div>
  );
};

export default ProcedurePage;
