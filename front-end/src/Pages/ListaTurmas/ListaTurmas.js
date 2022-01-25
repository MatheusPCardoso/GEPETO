import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTurmas, selectAllTurmas, deleteTurmaServer } from '../../shared/TurmasSlice'
import _Table from '../../Components/Table/Table';
import { toast } from 'react-toastify';

function ListaTurma(props) {
  const turmas = useSelector(selectAllTurmas)
  const status = useSelector(state => state.turmas.status); 

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchTurmas())
    } else if (status === 'failed') {
      setTimeout(()=> console.log('Algou deu errado!'));
    }
  }, [status, dispatch])

  function deletaTurma(id) {
    dispatch(deleteTurmaServer(id)).then(res => {
      if(res.error){
        toast.error('Algo deu errado!')
      }else {
        toast.success('Deletado com sucesso!')
      }
    })
  }
  
  return (
    <_Table 
      title={['Cod turma', 'Nome','Professor', 'Alunos']} 
      row={['codTurma','nome']} 
      person={turmas} 
      status={status} 
      func1={deletaTurma} 
      func2={turmas}
      turma={true}
      href = '/dashboard'
    />
  )

}

export default ListaTurma;