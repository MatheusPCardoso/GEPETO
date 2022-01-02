import { Paper, TableBody, TableCell, TableContainer } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {  Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import UIContainer from '../../Components/Container/container';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fetchProfessores, selectAllProfessores, deleteProfessorServer, updateProfessorServer } from '../../shared/ProfessoresSlice'
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import _Table from '../../Components/Table/Table';


function ListaProfessores(props) {
  
  const professores = useSelector(selectAllProfessores)
  const status = useSelector(state => state.professores.status);
  const error = useSelector(state => state.professores.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'not_loaded') {
      dispatch(fetchProfessores())
    } else if (status === 'failed') {
      setTimeout(()=>dispatch(fetchProfessores()), 5000);
    }
  }, [status, dispatch])

  function updateProfessor(professor, id){
    const arrayLinhas = Array.from(document.querySelectorAll('.professor')).map(el => Array.from(el.children).slice(0, 3));
    const professorEditado = arrayLinhas[id];

    console.log(arrayLinhas)
    
    const professorObj = {  
      turma: professorEditado[0].innerHTML,
      username: professorEditado[1].innerHTML,
      nome: professorEditado[2].innerHTML,
    }
    let professorUpdate = Object.assign({},professor, professorObj)
    dispatch(updateProfessorServer(professorUpdate));
    location.reload();
  }


  function deletaProfessor(id) {
    dispatch(deleteProfessorServer(id))
  }

  console.log(professores)

  return (
    <_Table 
        title={['Turma', 'Username', 'Nome']} 
        row={['turma', 'username','nome']} 
        person={professores} 
        status={status} 
        func1={deletaProfessor} 
        func2={updateProfessor}
      />
  )
}

export default ListaProfessores;
