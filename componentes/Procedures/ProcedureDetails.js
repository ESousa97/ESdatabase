// components/ProcedureDetails.js

function ProcedureDetails({ procedure }) {
    // Se não houver procedimento, retorna null ou um fallback
    if (!procedure) return null;
  
    return (
      <div>
        <h1>{procedure.titulo}</h1>
        <div dangerouslySetInnerHTML={{ __html: procedure.conteudo }} />
      </div>
    );
  }
  
  export default ProcedureDetails;
  