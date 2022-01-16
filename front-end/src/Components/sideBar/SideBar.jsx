import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import { BsFillPeopleFill, BsDoorOpenFill, BsFillKanbanFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import './sidebar.css';

const Sidebar = () => {
    const [user, setUser] = useState();

    return (
        <>
            <div class="sidebar">
                <ul class="nav-list">
                    <li>
                        <a href="/lista/alunos">
                            <div className="imagem">
                                <BsFillPeopleFill />
                            </div>

                            <span class="links_name">Alunos</span>
                        </a>
                        <span class="tooltip">Alunos</span>
                    </li>
                    <li>
                        <a href="/lista/professores">
                            <div className="imagem">
                                <BsFillKanbanFill />
                            </div>

                            <span class="links_name">Professores</span>
                        </a>
                        <span class="tooltip">Professores</span>
                    </li>
                    <li>
                        <a href="/lista/turmas">
                            <div className="imagem">
                                <BsDoorOpenFill />
                            </div>

                            <span class="links_name">Turmas</span>
                        </a>
                        <span class="tooltip">Turmas</span>
                    </li>
                    <li>
                        <a href="/cadastro/alunos">
                            <div className="imagem">
                                <BsFillPeopleFill />
                            </div>

                            <span class="links_name">Cadastro Alunos</span>
                        </a>
                        <span class="tooltip">Cadastro Alunos</span>
                    </li>
                    <li>
                        <a href="/cadastro/professores">
                            <div className="imagem">
                                <BsFillKanbanFill />
                            </div>

                            <span class="links_name">Cadastro Professores</span>
                        </a>
                        <span class="tooltip">Cadastro Professores</span>
                    </li>
                    <li>
                        <a href="/cadastro/turma">
                            <div className="imagem">
                                <BsDoorOpenFill />
                            </div>

                            <span class="links_name">Cadastro Turmas</span>
                        </a>
                        <span class="tooltip">Cadastro Turmas</span>
                    </li>
                    <li>
                        <span className="imagem">
                            <NavLink exact to="/" onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('usuario');
                                localStorage.removeItem('tipo');
                                toast.info('Deslogado com sucesso!')
                            }}>
                                <BsFillArrowLeftSquareFill className="imagem" />
                            </NavLink>
                        </span>

                            <span class="tooltip-out">Sair</span>
                    </li>
                </ul>


            </div>
            <section class="home-section">
                <div class="text">Dashboard</div>
            </section>

        </>
    )
};

export default Sidebar;