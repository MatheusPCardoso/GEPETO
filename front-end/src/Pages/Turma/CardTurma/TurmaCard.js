import React from 'react';
import './TurmaCard.css';
import Button from '@material-ui/core/Button';
export default function CardTurma(props) {

 /* const turma = useSelector((state) => selectTurmasById(state, id));*/

  return (<>
    <div className="card-Turma">
      <div className="nome-Turma">  
        {props.nome}
      </div>
       {/*  <div>
        <Link to={`/turma/${turma.id}`}><span>Ver turma</span></Link> 
        </div>*/}

        
      <div>
      professor: {props.professor}
      </div>
      <div>
      <Button type='submit'>Ver alunos</Button>
      </div>

      <div className="periodo-turma">
        {props.dataInicio} - {props.dataFim}
      </div>
    </div>
  </>);
}



