
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteAlunoServer, fetchAlunos, selectAllAlunos, updateAlunoServer } from '../../shared/AlunosSlice'

import './ListaAlunos.css'

import _Table from '../../Components/Table/Table';

function ListaAluno(props) {
  
  const alunos = useSelector(selectAllAlunos)
  const status = useSelector(state => state.alunos.status);
  const error = useSelector(state => state.alunos.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchAlunos())
    } else if (status === 'failed') {
      setTimeout(() => dispatch(fetchAlunos()), 2000);
    }
  }, [status, dispatch])


  function updateAluno(aluno) {
    const alunoUptade = {
      nome: "",
      turma: "",
      username: "",
    }

    let allTurmas = document.querySelectorAll(".turma");
    let allUsername = document.querySelectorAll(".username");
    let allNome = document.querySelectorAll(".nome");
    let i = 0;
    while (i != allTurmas.length) {
      if (allTurmas[i].innerHTML == aluno.turma) {
        alunoUptade.turma = allTurmas[i].innerHTML;
        alunoUptade.username = allUsername[i].innerHTML;
        alunoUptade.nome = allNome[i].innerHTML;
        break
      }
      else {
        i++
      }
    }
    let alunoChanged = Object.assign({}, aluno, alunoUptade);
    dispatch(updateAlunoServer(alunoChanged));
    location.reload();
  }

  function deletaAluno(id) {
    console.log(id);
    dispatch(deleteAlunoServer(id))
  }
  
  return (
    <_Table title={['Turma', 'Username', 'Nome']} row={['turma', 'username','nome']} person={alunos} status={status} func1={deletaAluno} func2={updateAluno}/>
  )

}

export default ListaAluno;


