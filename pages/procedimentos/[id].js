import ProcedurePages from '../../componentes/Procedures/ProcedurePages';
import { getSession } from 'next-auth/react';

export default function ProcedurePage() {
  return <ProcedurePages />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // Redireciona para a página de login se o usuário não estiver autenticado
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
