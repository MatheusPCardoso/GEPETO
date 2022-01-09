import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTurmas, selectAllTurmas, deleteTurmaServer, updateTurmaServer } from '../../shared/TurmasSlice'
import { selectAllProfessores, fetchProfessores } from '../../shared/ProfessoresSlice';
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
      setTimeout(()=> console.log('Algou deu errado!'));
    }
  }, [status, dispatch])

  function deletaTurma(id) {
    dispatch(deleteTurmaServer(id))
  }
  return (
    <_Table 
      title={['Cod turma', 'Nome','Professor', 'Alunos']} 
      row={['codTurma','nome']} 
      person={turmas} 
      status={status} 
      func1={deletaTurma} 
      func2={turmas}
    />
  )

}

export default ListaTurma;