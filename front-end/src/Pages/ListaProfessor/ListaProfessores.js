//imports
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchProfessores, 
          selectAllProfessores, 
          deleteProfessorServer 
        } from '../../shared/ProfessoresSlice'
import _Table from '../../Components/Table/Table';
import { toast } from 'react-toastify';


function ListaProfessores() {
  //Alocando useDispach em const para reutilizar
  const dispatch = useDispatch();
  //constantes que armazenarão os professores e o status da const professores (loaded, not_loaded, loading ou failed)
  const professores = useSelector(selectAllProfessores)
  const status = useSelector(state => state.professores.status);
  
  useEffect(() => {
    //valida se o status está como não carregado
    if (status === 'not_loaded') {
      //se sim, irá dar um GET em professores
      dispatch(fetchProfessores())
    } else if (status === 'failed') {
      //se não, irá avisar ao usuário que ocorreu um problema
      toast.error('Ocorreu um problema ao tentar obter os professores! Por favor, tente novamente mais tarde.')
      console.log('O status de professores falhou')
    }
  }, [status, dispatch])

  //função resposnsável por deletar o professor
  function deletaProfessor(id) {
    dispatch(deleteProfessorServer(id)).then(res => {
      if(res.error){
        toast.error('Algo deu errado!')
      }else {
        toast.success('Deletado com sucesso!')
      }
    })
  }
  
  //cria uma table com as informações
  return (
    <_Table 
        title={['Turma', 'Username', 'Nome',' ', ' ', ' ']} 
        row={['codTurma', 'username','nome']} 
        person={professores} 
        status={status} 
        func1={deletaProfessor}
        whoEdit='professores'
        href = '/dashboard'
      />
    
  )
}

export default ListaProfessores;
