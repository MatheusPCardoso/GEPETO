import React, { useState } from "react"
import { Navbar, Nav, Container, Toast } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import '../../assets/images/logo.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function NavBar(props) {
    const [user, setUser] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        setUser(usuario);
        setType(localStorage.getItem('tipo'));
    }, [props.usuario]);

    const isAluno = () => type == 'alunos';
    const isProf = () => type == 'professores';
    const isEscola = () => type == 'escola';
    const loggedIn = () => user;

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark" hidden={isEscola()}>
                <Container >

                    <NavLink to="/" className="gepeto"><img className="img-fluid"
                        src="../../../assets/images/logo.png" style={{ width: "100px" }} /></NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
                        <Nav className="navbar">
                            <Nav.Link hidden={!loggedIn() || isAluno() || isEscola()}>
                                <NavLink to="/prova/criar" style={{ textDecoration: 'none' }}>Criar Prova</NavLink>
                            </Nav.Link>
                            <Nav.Link hidden={!loggedIn() || isEscola()}>
                                <NavLink to="/provas" style={{ textDecoration: 'none' }}>Provas</NavLink>
                            </Nav.Link>
                            <Nav.Link hidden={!loggedIn() || isAluno() || isProf()}>
                                <NavLink to="/cadastro/alunos" style={{ textDecoration: 'none' }}>Cadastro de alunos</NavLink>
                            </Nav.Link>
                            <Nav.Link hidden={!loggedIn() || isEscola()}>
                                <NavLink to="/resultado" style={{ textDecoration: 'none' }}>Resultado</NavLink>
                            </Nav.Link>
                        </Nav>
                        <Navbar.Text className="navLogin-pai">
                            {
                                user
                                    ? <NavLink exact to="/" onClick={() => {
                                        localStorage.removeItem('token');
                                        localStorage.removeItem('usuario');
                                        localStorage.removeItem('tipo');
                                        toast.success('Deslogado com sucesso!', {
                                            position: toast.POSITION.TOP_CENTER
                                        })
                                        setUser('');
                                    }}>Sair</NavLink>
                                    : <NavLink to="/" className="navLogin">Fazer Login</NavLink>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}