import React, { useState } from "react";

import Sidebar from "../../Components/sideBar/SideBar.jsx";
import { BsFillPeopleFill, BsDoorOpenFill, BsFillKanbanFill, BsHouseDoorFill } from "react-icons/bs";
import { PieChart } from '../../Components/Chart/PieChart';

import ListaAluno from '../ListaAluno/ListaAlunos'
import ListaProfessores from '../ListaProfessor/ListaProfessores'
import ListaTurma from '../ListaTurmas/ListaTurmas'
import FormularioAluno from '../CadastroAluno/Form'
import FormularioProfessor from '../CadastroProfessor/Form'
import FormularioTurma from '../CadastroTurma/Form'

function Dashboard() {

    const [view, setView] = useState(0);

    const data = [
        { href: '/dashboard', name: 'Home', id: 0, icon: <BsHouseDoorFill /> },
        { href: '/lista/alunos', name: 'Alunos', id: 1, icon: <BsFillPeopleFill /> },
        { href: '/lista/professores', name: 'Professores', id: 2, icon: <BsFillKanbanFill /> },
        { href: '/lista/turmas', name: 'Turmas', id: 3, icon: <BsDoorOpenFill /> },
        { href: '/cadastro/alunos', name: 'Cadastrar aluno', id: 4, icon: <BsFillPeopleFill /> },
        { href: '/cadastro/professores', name: 'Cadastrar professor', id: 5, icon: <BsFillKanbanFill /> },
        { href: '/cadastro/turma', name: 'Cadastrar turma', id: 6, icon: <BsDoorOpenFill /> },
    ]

    var arrayLink = [
        <PieChart owner={0} />,
        <ListaAluno />,
        <ListaProfessores />,
        <ListaTurma />,
        <FormularioAluno />,
        <FormularioProfessor />,
        <FormularioTurma />
    ]
    
    return (

        <>
            <Sidebar data={data} func={setView} dashboard={arrayLink[view]} />
        </>
    );

}

export default Dashboard;