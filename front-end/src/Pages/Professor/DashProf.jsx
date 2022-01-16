import React from "react";

import { Navigation } from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { BsFillHouseDoorFill, BsFillBookFill, BsFillArrowLeftSquareFill} from "react-icons/bs";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const style = {
    width: '250px',
    height: '100vh',
    paddingTop: '5%',
    backgroundColor: '#949799',
    color: 'white'
}


export default function DashboardNavbar() {

    const history = useHistory();

    return (
        <div style={style}>
            <Navigation
                activeItemId="/dashboardp"
                onSelect={({ itemId }) => {
                    if (itemId === '/') {
                        localStorage.removeItem('token');
                        localStorage.removeItem('usuario');
                        localStorage.removeItem('tipo');
                        toast.info('Deslogado com sucesso!')
                        history.push(itemId)
                    }
                    else if (itemId == 'turma') {

                    } else {
                        history.push(itemId)
                    }
                }}
                items={[
                    {
                        title: 'Dashboard',
                        itemId: '/dashboardp',
                        elemBefore: () => <BsFillHouseDoorFill name="dashboard" />,
                    },
                    {
                        title: 'Criar Prova',
                        itemId: '/prova/criar',
                        elemBefore: () => <BsFillBookFill name="prova" />,
                    },
                    {
                        title: 'Sair',
                        itemId: '/',
                        elemBefore: () => <BsFillArrowLeftSquareFill name="prova" />,
                    },
                ]}

            />
        </div>
    );

}