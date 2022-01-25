import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { store } from './shared/store';
import { Provider } from 'react-redux';

import { CreateExam } from './Pages/CreateExam';
import { Exam }  from './Pages/Exam';
import FormularioAluno from './Pages/CadastroAluno/Form';
import FormularioProfessor from './Pages/CadastroProfessor/Form';
import FormularioTurma from './Pages/CadastroTurma/Form';
import Login from './Pages/Login';
import ListaAluno from './Pages/ListaAluno/ListaAlunos';
import ListaProfessores from './Pages/ListaProfessor/ListaProfessores';
import ListaTurmas from './Pages/ListaTurmas/ListaTurmas';
import ExamResult from './Pages/ExamResult';
import Dashboard from './Pages/DashboardEstab/DashboardEstab';
import DashboardNavbar from './Pages/Professor/DashProf';
import ListaAlunosProfessor from './Pages/Professor/ListaAlunosProfessor';
import DashboardAlunos from './Pages/DashboardAlunos/DashboardAlunos';


function App() {
  const history = useHistory();

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/lista/professores"><ListaProfessores/></Route>
          <Route path="/turma"><ListaAlunosProfessor/></Route>
          <Route path="/professor/provas"></Route>
          <Route exact path="/dashboard"><Dashboard/></Route>
          <Route path="/lista/alunos"><ListaAluno/></Route>
          <Route path="/lista/turmas"><ListaTurmas/></Route>
          <Route path="/cadastro/alunos"><FormularioAluno/></Route>
          <Route path="/cadastro/professores"><FormularioProfessor /></Route>
          <Route path="/cadastro/turma"><FormularioTurma/></Route>
          <Route path="/resultado"><ExamResult /></Route>
          <Route path="/dashboarda"><DashboardAlunos /></Route>
          <Route path="/prova/criar"><CreateExam /></Route>
          <Route path="/prova/:id"><Exam/></Route>
          <Route path="/dashboardp"><DashboardNavbar /></Route>
          <Route exact path="/"><Login /></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
