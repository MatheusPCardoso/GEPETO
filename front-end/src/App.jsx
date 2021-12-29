import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { NavBar } from './Components/NavBar/navBar';
import { store } from './shared/store';
import { Provider } from 'react-redux';

import { CreateExam } from './Pages/CreateExam';
import { Exam }  from './Pages/Exam';
import FormularioAluno from './Pages/CadastroAluno/Form';
import FormularioProfessor from './Pages/CadastroProfessor/Form';
import FormularioTurma from './Pages/CadastroTurma/Form';
import Login from './Pages/Login';
import Turma from './Pages/Turma/';
import ListaAluno from './Pages/ListaAluno/ListaAlunos';
import ListaProfessores from './Pages/ListaProfessor/ListaProfessores';
import ListaTurmas from './Pages/ListaTurmas/ListaTurmas';
import Provas from './Pages/Provas';
import ExamResult from './Pages/ExamResult';
import Dashboard from './Pages/DashboardEstab/DashboardEstab';

function App() {
  const history = useHistory();
  const [user, setUser] = useState({});

  return (
    <Provider store={store}>
      <Router history={history}>
        <NavBar usuario={user}/>
        <Switch>
          <Route path="/lista/professores"><ListaProfessores/></Route>
          <Route path="/dashboard"><Dashboard/></Route>
          <Route path="/lista/alunos"><ListaAluno/></Route>
          <Route path="/lista/turmas"><ListaTurmas/></Route>
          <Route path="/cadastro/alunos"><FormularioAluno user={user}/></Route>
          <Route path="/cadastro/professores"><FormularioProfessor user={user}/></Route>
          <Route path="/cadastro/turma"><FormularioTurma user={user}/></Route>
          <Route path="/resultado"><ExamResult /></Route>
          <Route path="/provas"><Provas/></Route>
          <Route path="/prova/criar"><CreateExam /></Route>
          <Route path="/prova/:id"><Exam/></Route>
          <Route path="/turma" component={Turma}/>
          <Route exact path="/"><Login /></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
