import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardTurma from '../CardTurma/TurmaCard';
import { fetchTurmas, selectAllTurmas } from '../TurmasSlice';
import './ListaDeTurmas.css';


export default function ListaDeTurmas(props) {
  const turmas = useSelector(selectAllTurmas)
  const status = useSelector(state => state.turmas.status);
  const error = useSelector(state => state.turmas.error);

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchTurmas())
    } else if (status === 'failed') {
      setTimeout(()=>dispatch(fetchTurmas()), 5000);
    }
  }, [status, dispatch]) 

  console.log(turmas);

  if(turmas.length > 0){
    return (
      <div style={{textAlign:"center"}}>
        <div className="lista">
          {turmas.map(card => (
            <>
              <CardTurma nome={card.nome} dataInicio={card.dataInicio}
                dataFim={card.dataFim} professor={card.professor}/>
            </>

          ))}
        </div>
        
      </div>
    )
  }
  else{
    return (
      <div>
        <div className="lista" style={{marginTop:'10rem'}}>
          <h1>Lista de turmas vazia!</h1>
        </div>
      </div>
    )
  }
  
}