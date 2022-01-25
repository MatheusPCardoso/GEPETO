import React, { useEffect, useState} from "react";

import { fetchProfessorUser } from "../../shared/ProfessoresSlice";
import { selectAllAlunos, fetchAlunos } from "../../shared/AlunosSlice";

import { SiGoogleclassroom, SiGitbook, SiBookstack, SiHomeassistant } from "react-icons/si";
import Sidebar from '../../Components/sideBar/SideBar'

import { PieChart } from '../../Components/Chart/PieChart';
import { useDispatch, useSelector } from "react-redux";

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import 'react-toastify/dist/ReactToastify.css'

import ListaAlunosProfessor from "./ListaAlunosProfessor";
import { CreateExam } from "../CreateExam";
import { Provas } from '../Provas/index'

export default function DashboardNavbar() {
    var [view, setView] = useState(0)
    const [professor, setProfessor] = useState('')
    const dispatch = useDispatch();
    const alunos = useSelector(selectAllAlunos)
    const statusAlunos = useSelector(state => state.alunos.status);

    useEffect(() => {
        if (statusAlunos === 'not_loaded') {
            dispatch(fetchAlunos())
        } else if (statusAlunos === 'failed') {
            console.log('Status alunos falhou!')
        }
    }, [statusAlunos, dispatch])

    dispatch(fetchProfessorUser(localStorage.getItem('usuario')))
        .then(res => {
            setProfessor(res.payload[0].codTurma)
        })

    const data = [
        { href: '/dashboardp', name: 'Home', id: 0, icon: <SiHomeassistant /> },
        { href: '/prova/criar', name: 'Criar prova', id: 2, icon: <SiGitbook /> },
        { href: '/turma', name: 'Ver turma', id: 1, icon: <SiGoogleclassroom /> },
        { href: '/professor/provas', name: 'Ver provas', id: 3, icon: <SiBookstack /> },
    ]

    var arrayLinks = [
        <PieChart owner={1} turmaProfessor = {professor}/>,
        <ListaAlunosProfessor alunos={alunos} stateAlunos={statusAlunos} professor={professor}/>,
        <CreateExam />,
        <Provas />
    ]
    return (
        <div>
            <Sidebar data={data} func={setView} dashboard={arrayLinks[view]} />
        </div>
    );

}