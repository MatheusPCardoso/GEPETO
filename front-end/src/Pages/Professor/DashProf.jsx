import React, { useEffect } from "react";

import { fetchProfessorUser } from "../../shared/ProfessoresSlice";
import { selectAllAlunos, fetchAlunos } from "../../shared/AlunosSlice";

import { SiGoogleclassroom, SiGitbook } from "react-icons/si";
import Sidebar from '../../Components/sideBar/SideBar'

import { PieChart } from '../../Components/Chart/PieChart';
import { useDispatch, useSelector } from "react-redux";

import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import 'react-toastify/dist/ReactToastify.css'

export default function DashboardNavbar() {
    var professor = {}
    const dispatch = useDispatch();
    const arrayAlunos = [];
    const alunos = useSelector(selectAllAlunos)
    const statusAlunos = useSelector(state => state.alunos.status);

    useEffect(() => {
        if (statusAlunos === 'not_loaded') {
            dispatch(fetchAlunos())
        } else if (statusAlunos === 'failed') {
            console.log('algo deu errado!')
        }
    }, [statusAlunos, dispatch])


    const optionsExames = {
        title: 'Provas',
        is3D: true,
    };

    const optionsAlunos = {
        title: 'Alunos',
        is3D: true,
    };

    dispatch(fetchProfessorUser(localStorage.getItem('usuario')))
        .then(res => {
            professor = res.payload[0]
        })


    alunos.map(aluno => {
        if(aluno.turma == professor.codTurma){
            arrayAlunos.push([alunos.nome, 1])
        }
    })


    console.log(123)


    const data = [
        { href: '/prova/criar', name: 'Criar prova', icon: <SiGitbook /> },
        { href: '/turma', name: 'Ver turma', icon: <SiGoogleclassroom /> },
        { href: '/', name: 'Ver turma', icon: <SiGoogleclassroom /> },
    ]





    return (
        <div>
            <Sidebar data={data} dashboard={<PieChart graficos={{ data: 'dataAlunos', options: 'optionsAlunos' }} />} />
        </div>
    );

}