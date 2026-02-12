import { useRouter } from 'next/router';
import { useMemo } from 'react';
import MainLayout from '../Layout/MainLayout';
import ProcedureDetails from './ProcedureDetails';
import { demoProjects } from '../../data/demoProjects'; // ajuste se usar outro mock

function ProcedurePage() {
  const router = useRouter();
  const { id } = router.query;

  const { procedure, notFound } = useMemo(() => {
    if (!id) return { procedure: null, notFound: false };
    const proc = demoProjects.find((item) => String(item.id) === String(id)); // força string por precaução
    return { procedure: proc || null, notFound: !proc };
  }, [id]);

  return (
    <MainLayout>
      {!id ? (
        <div style={{ padding: 32 }}>Carregando...</div>
      ) : notFound ? (
        <div style={{ padding: 32, color: 'crimson', fontWeight: 'bold' }}>
          Procedimento não encontrado 😥
        </div>
      ) : (
        <ProcedureDetails procedure={procedure} />
      )}
    </MainLayout>
  );
}

export default ProcedurePage;
