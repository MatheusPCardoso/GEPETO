import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import './sidebar.css';


const Sidebar = (props) => {

    return (
        <>
            <div class="sidebar">
                <ul class="nav-list">
                    {
                        props.data.map((data) => {
                            return (
                                <li>
                                    <a href={data.href}>
                                        <div className="imagem">
                                            {data.icon}
                                        </div>

                                        <span class="links_name">{data.name}</span>
                                    </a>
                                    <span class="tooltip">{data.name}</span>
                                </li>
                            )
                        })
                    }
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
                {props.dashboard}
            </section>

        </>
    )
};

export default Sidebar;