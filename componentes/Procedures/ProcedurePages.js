import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '../../pages/MainLayout';
import ProcedureDetails from './ProcedureDetails';
import { demoProjects } from '../../data/demoProjects'; // ajuste se usar outro mock

function ProcedurePage() {
  const [procedure, setProcedure] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const proc = demoProjects.find(item => String(item.id) === String(id)); // força string por precaução
    setProcedure(proc || null);
    setNotFound(!proc);
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
