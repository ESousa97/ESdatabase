// components/Procedures/ProcedurePages.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../../pages/MainLayout'; // Certifique-se de que o caminho está correto
import ProcedureDetails from './ProcedureDetails'; // Confirme o caminho

function ProcedurePages() {
  const [procedure, setProcedure] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // URL corrigida:
      axios.get(`http://localhost:3000/api/procedure?id=${id}`)
        .then(response => {
          setProcedure(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar procedimento:', error);
        });
    }
  }, [id]);

  return (
    <MainLayout>
      <ProcedureDetails procedure={procedure} />
    </MainLayout>
  );
}

export default ProcedurePages;
