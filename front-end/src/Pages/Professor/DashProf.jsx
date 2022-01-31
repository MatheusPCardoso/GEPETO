//imports
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
import Provas from '../Provas/index'
import { toast } from "react-toastify";


export default function DashboardNavbar() {
    //setando dispatch em uma variavel para reuso
    const dispatch = useDispatch();
    //criando uma variavel responsável por fazer a mudança de elementos ao clicar na sidebar
    var [view, setView] = useState(0)
    
    //criando um estado para professor que levará o nome do professor
    const [professor, setProfessor] = useState('')
    //constantes que salvarão os alunos e o status (loaded, not_loaded, loading, failed)
    const alunos = useSelector(selectAllAlunos)
    const statusAlunos = useSelector(state => state.alunos.status);

    
    useEffect(() => {
        //verifica se o status de alunos está como não carregado
        if (statusAlunos === 'not_loaded') {
            //se sim, da um GET em alunos
            dispatch(fetchAlunos())
        } 
        //verifica se o status de alunos está como falhou
        else if (statusAlunos === 'failed') {
            //se sim, envia um alert informando que o GET falhou
            toast.error('Erro ao carregar status de alunos!')
        }
    }, [statusAlunos, dispatch])

    //vai no localstorage pegar o o usuario que está logado
    dispatch(fetchProfessorUser(localStorage.getItem('usuario')))
        .then(res => {
            //seta em professor o nome do professor
            setProfessor(res.payload[0].codTurma)
        })

    /*
        informações necessárias para a construção da sidebar como {
            href -> url para direcionar,
            name -> nome que será exibido no tooltip,
            id -> id necessário para a variavel view manusear a view,
            icon -> icone que ficará na sidebar
        }
    */
    const data = [
        { href: '/dashboardp', name: 'Home', id: 0, icon: <SiHomeassistant /> },
        { href: '/prova/criar', name: 'Criar prova', id: 2, icon: <SiGitbook /> },
        { href: '/turma', name: 'Ver turma', id: 1, icon: <SiGoogleclassroom /> },
        { href: '/professor/provas', name: 'Ver provas', id: 3, icon: <SiBookstack /> },
    ]

    //componentes que serão alterados pela variavel view
    var arrayLinks = [
        <PieChart owner={1} turmaProfessor = {professor}/>,
        <ListaAlunosProfessor alunos={alunos} stateAlunos={statusAlunos} professor={professor}/>,
        <CreateExam />,
        <Provas />
    ]

    //retorna o componente sidebar passando a função responsavel por setar a view e os componentes
    return (
        <div>
            <Sidebar data={data} func={setView} dashboard={arrayLinks[view]} />
        </div>
    );

}