import React from 'react';

import { BsFillPeopleFill, BsDoorOpenFill, BsFillKanbanFill } from "react-icons/bs";


import './sidebar.css';

const Sidebar = () => {

    return (
        <>
            <div class="sidebar">
                {/* <div class="logo-details">
                    <div class="logo_name"></div>
                    <div className="imagem">
                        <AiOutlineMenu id='btn'/>
                    </div>
                    
                </div> */}
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
                </ul>
            </div>
            <section class="home-section">
                <div class="text">Dashboard</div>
            </section>
        </>
    )
};

export default Sidebar;