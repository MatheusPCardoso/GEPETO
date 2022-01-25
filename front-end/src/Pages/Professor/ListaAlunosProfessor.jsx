import React  from 'react';
import _Table from '../../Components/Table/Table'


export default function ListaAlunosProfessor(props) {

  var arrayAlunos = []
  var alunos = props.alunos

  alunos.map(aluno => {
    if (props.professor == aluno.turma) {
      arrayAlunos.push(aluno)
    }
    alunos = arrayAlunos
  })
  

  return (
    
    <_Table
      title={['Turma', 'Username', 'Nome']}
      row={['turma', 'username', 'nome']}
      person={alunos}
      status={props.statusAlunos}
      whoEdit='Professor'
      href='/dashboardp'
    />
  );
}
