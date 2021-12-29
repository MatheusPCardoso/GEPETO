import React, { useState, useRef, useContext } from 'react'

import './Form.css' 

import { Form } from '@unform/web'
import Input from '../../Components/Form/Input'
import { NavLink } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import UIContainer from '../../Components/Container/container'

export default function FormularioTurma() {

    //const [isClass, setClass] = useState(false);

    const refForm = useRef(null); //Referencia do formulario no HTML

    function onSubmit(data) {
	    var value = document.getElementById('drop')
                .options[document
                .getElementById('drop')
                .selectedIndex].value;
        console.log(data)
        /* if (value == "Aluno") {
            console.log("INSERIU COMO ALUNO");
            //insertAluno(data);
        } else if (value == "Professor") {
            console.log("INSERIU COMO PROFESSOR");
            //insertProfessor(data);
        } */

        refForm.current.reset();
    }

    return (
        <UIContainer>
            <Form className='Form' ref={refForm} onSubmit={onSubmit}>

                <div className="div-card">
                    <NavLink to="/dashboard" className="voltar"><BiArrowBack /> Voltar</NavLink>
                    <div className='container-card'>
                        <div>
                            <h1 className="title">Cadastro de turma</h1>
                        </div>

                        <div className="cadastro-form">
                            <Input
                                name='nome'
                                id='nome'
                                type='text'
                                autoComplete='off'
                                className='form-control'
                                placeholder='Nome'
                                required={true}
                            />
                        </div>
                        <div className="cadastro-form">
                            <Input
                                name='matricula'
                                id='matricula'
                                type='text'
                                autoComplete='off'
                                className='form-control'
                                placeholder='Matricula'
                                required={true}
                            />
                        </div>
                        <div className="cadastro-form">
                            <Input
                                name='idTurma'
                                id='idTurma'
                                type='text'
                                className='form-control'
                                autoComplete='off'
                                placeholder='Turma'
                                required={true}
                            />
                        </div>
                        <div className="cadastro-form">
                            <Input
                                name='username'
                                id='username'
                                className='form-control'
                                type='text'
                                autoComplete='off'
                                placeholder='Email'
                                required={true}
                            />
                        </div>
                        <div className="cadastro-form">
                            <Input
                                name='password'
                                id='password'
                                className='form-control'
                                type='password'
                                autoComplete='off'
                                placeholder='Senha'
                                required={true}
                            />
                        </div>

                        <div className="d-flex">


                            <button type="submit" className="btn btn-primary me-md-2">Salvar</button>
                        </div>
                    </div>
                </div>
            </Form>
        </UIContainer>

    )
}