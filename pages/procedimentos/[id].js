import ProcedurePages from '../../componentes/Procedures/ProcedurePages';

export default function ProcedurePage() {
  return <ProcedurePages />;
}

export async function getServerSideProps(context) {
  // Acesso público: não há verificação de sessão
  return {
    props: {},
  };
}
