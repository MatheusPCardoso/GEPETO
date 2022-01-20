import React, { useEffect } from "react";

import Sidebar from "../../Components/sideBar/SideBar.jsx";
import { BsFillPeopleFill, BsDoorOpenFill, BsFillKanbanFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import { PieChart } from '../../Components/Chart/PieChart';

function Dashboard() {

    const data = [
        {href:'/lista/alunos', name:'Alunos', icon: <BsFillPeopleFill />},
        {href:'/lista/professores', name:'Professores', icon: <BsFillKanbanFill />},
        {href:'/lista/turmas', name:'Turmas', icon: <BsDoorOpenFill />},
        {href:'/cadastro/alunos', name:'Cadastrar aluno', icon: <BsFillPeopleFill />},
        {href:'/cadastro/professores', name:'Cadastrar professor', icon: <BsFillKanbanFill />},
        {href:'/cadastro/turma', name:'Cadastrar turma', icon: <BsDoorOpenFill />},
    ]
        return (
    
            <>
                <Sidebar data={data} dashboard={<PieChart />}/>
            </>
        );
    
}

export default Dashboard;