//imports
import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTurmas, selectAllTurmas, deleteTurmaServer } from '../../shared/TurmasSlice'
import _Table from '../../Components/Table/Table';
import { toast } from 'react-toastify';

function ListaTurma(props) {
  //constantes que armazenarão turmas e existentes e o status da const turmas
  const turmas = useSelector(selectAllTurmas)
  const status = useSelector(state => state.turmas.status); 
  //Alocando useDispach em const para reutilizar
  const dispatch = useDispatch();

  useEffect(() => {
    //valida se o status está como não carregado
    if (status === 'not_loaded') {
      //se sim, irá dar um GET em turmas
      dispatch(fetchTurmas())
    } else if (status === 'failed') {
      //se não, irá avisar ao usuário que ocorreu um problema
      toast.error('Ocorreu um problema ao tentar obter as turmas! Por favor, tente novamente mais tarde.')
      console.log('O status de turmas falhou')
    }
  }, [status, dispatch])

  //função que é responsável por deletar as turmas
  function deletaTurma(id) {
    dispatch(deleteTurmaServer(id)).then(res => {
      if(res.error){
        toast.error('Ocorreu um erro ao tentar apagar a turma! Por favor, tente novamente.')
      }else {
        toast.success('Deletado com sucesso!')
      }
    })
  }
  
  //cria uma table com as informações
  return (
    <_Table 
      title={['Cod turma', 'Nome','Professor', 'Alunos',' ', ' ']} 
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