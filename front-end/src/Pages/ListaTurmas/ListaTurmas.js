import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTurmas, selectAllTurmas, deleteTurmaServer, updateTurmaServer } from '../../shared/TurmasSlice'
import _Table from '../../Components/Table/Table';


function ListaTurma(props) {
  
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

  function updateTurma(Turma) {
    const turmaUptade = {
      username: "",
    }

    let allTurmas = document.querySelectorAll(".turma");
    let allUsername = document.querySelectorAll(".username");
    
    let i = 0;
    while (i != allTurmas.length) {
      if (allTurmas[i].innerHTML == Turma.turma) {
        turmaUptade.username = allUsername[i].innerHTML;
        break
      }
      else {
        i++
      }
    }
    let turmaChanged = Object.assign({}, Turma, turmaUptade);
    dispatch(updateTurmaServer(turmaChanged));
    location.reload();
  }

  function deletaTurma(id) {
    dispatch(deleteTurmaServer(id))
  }
  console.log(turmas)
  return (
    <_Table title={['Turma', 'Nome','Professor', 'Alunos']} row={['turma','nome','professor']} person={turmas} status={status} func1={deletaTurma} func2={turmas}/>
  )


}

export default ListaTurma;


