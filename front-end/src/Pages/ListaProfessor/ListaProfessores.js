import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  fetchProfessores, 
          selectAllProfessores, 
          deleteProfessorServer 
        } from '../../shared/ProfessoresSlice'

import _Table from '../../Components/Table/Table';
import { toast } from 'react-toastify';

function ListaProfessores() {
  const dispatch = useDispatch();

  const professores = useSelector(selectAllProfessores)
  const status = useSelector(state => state.professores.status);
  
  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchProfessores())
    } else if (status === 'failed') {
      console.log('algo deu errado com o status do professor')
    }
  }, [status, dispatch])


  function deletaProfessor(id) {
    dispatch(deleteProfessorServer(id)).then(res => {
      if(res.error){
        toast.error('Algo deu errado!')
      }else {
        toast.success('Deletado com sucesso!')
      }
    })
  }

  return (
    <_Table 
        title={['Turma', 'Username', 'Nome']} 
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
