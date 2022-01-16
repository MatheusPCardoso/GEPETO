
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteAlunoServer, fetchAlunos, selectAllAlunos } from '../../shared/AlunosSlice'


import './ListaAlunos.css'
import _Table from '../../Components/Table/Table';
import { toast } from 'react-toastify';

function ListaAluno() {

  const alunos = useSelector(selectAllAlunos)
  const status = useSelector(state => state.alunos.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchAlunos())
    } else if (status === 'failed') {
      console.log('algo deu errado com o status dos alunos')
    }
  }, [status, dispatch])

  function deletaAluno(id) {
    dispatch(deleteAlunoServer(id)).then(res => {
      if (res.error) {
        toast.error('Algo deu errado!')
      } else {
        toast.success('Deletado com sucesso!')
      }
    })
  }

  return (
      <_Table title={['Turma', 'Username', 'Nome']}
        row={['turma', 'username', 'nome']}
        person={alunos}
        status={status}
        func1={deletaAluno}
        whoEdit='Alunos'
      />

  )

}

export default ListaAluno;


