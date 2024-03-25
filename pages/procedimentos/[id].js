import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress, Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import DOMPurify from 'dompurify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProcedureDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProcedure = async () => {
      if (!id) return;
  
      setLoading(true);
  
      try {
        const response = await fetch(`https://server-json-eight.vercel.app/api/procedure.js/${id}`);
  
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
        setProcedure(data);
      } catch (error) {
        console.error('Erro ao buscar o procedimento:', error);
        toast.error('Erro ao carregar o procedimento. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProcedure();
  }, [id]);
  

  const preprocessContent = (content) => {
    if (!content) return ''; // Se o conteúdo estiver vazio, retornar uma string vazia

    // Processar o conteúdo antes de renderizar com Markdown
    let processedContent = content.replace(/\/Assets\/(IMC\d+\/IMC\d+__[1-9].png)/g, 'esdatabase.vercel.app/$1');
    processedContent = DOMPurify.sanitize(processedContent); // Sanitizar o conteúdo para evitar XSS
    return processedContent;
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (!procedure) {
    return (
      <Container>
        <Typography>Não foi possível encontrar o procedimento.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4">{procedure.titulo}</Typography>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>{procedure.descricao}</Typography>
      {/* Renderizar o conteúdo com Markdown */}
      <ReactMarkdown remarkPlugins={[gfm]}>
        {preprocessContent(procedure.conteudo)}
      </ReactMarkdown>
      <ToastContainer />
    </Container>
  );
};

export default ProcedureDetails;
