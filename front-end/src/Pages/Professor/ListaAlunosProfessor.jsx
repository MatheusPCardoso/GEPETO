//imports
import React  from 'react';
import _Table from '../../Components/Table/Table'

export default function ListaAlunosProfessor(props) {

  //variavel que receberá alunos da turma do professor
  var arrayAlunos = [];

  //loop procurando alunos pertencentes a turma do professor
  props.alunos.map(aluno => {
    if (props.professor == aluno.turma) {
      arrayAlunos.push(aluno)
    }
  })
  
  //cliando uma table para listar esse alunos passando algumas variaveis
  return (
    
    <_Table
      title={['Turma', 'Username', 'Nome', '', '']}
      row={['turma', 'username', 'nome']}
      person={arrayAlunos}
      status={props.statusAlunos}
      whoEdit='Professor'
      href='/dashboardp'
    />
  );
}
