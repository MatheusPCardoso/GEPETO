import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux';

import './Form.css'

import { Form } from '@unform/web'
import Input from '../../Components/Form/Input'
import { NavLink } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import UIContainer from '../../Components/Container/container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { fetchTurmas, selectAllTurmas, updateTurmaServer } from '../../shared/TurmasSlice'
import { addProfessorServer } from '../../shared/ProfessoresSlice'
import { useState } from 'react';

toast.configure()

export default function FormularioProfessor() {
    const refForm = useRef(null)
    const turmas = useSelector(selectAllTurmas)
    const status = useSelector(state => state.turmas.status);
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchTurmas())
        } else if (status === 'failed') {
            setTimeout(() => { dispatch(fetchTurmas()) }, 5000);
        }
    }, [status, dispatch])

    function sendProNClass(professor, turma) {

        dispatch(addProfessorServer(professor))
            .then((res) => {
                if (res.error) {
                    toast.error('Algo deu errado!')
                }
                else {
                    let temp = { professor: '', who: 'professor' }
                    temp.professor = res.payload.nome
                    temp = Object.assign({}, turma, temp)
                    dispatch(updateTurmaServer(temp))
                        .then((res) => {
                            if (res.error) {
                                toast.error('Algo deu errado!')
                            }
                            else{
                                toast.success("Professor inserido com sucesso!")
                            }
                        })
                }
            })
    }

    function onSubmit(data) {
        var select = document.getElementById('turma');
        var value = select.options[select.selectedIndex].value;
        data.codTurma = value;
        data.who = 'professor'

        var validado = false;

        for (var i = 0; i < turmas.length; i++) {
            if (turmas[i].professor == '' && turmas[i].nome == data.codTurma) {
                sendProNClass(data, turmas[i])
                validado = true;
                refForm.current.reset();
            }
        }

        if (validado) {
            toast.success('Professor criado com sucesso!', {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else {
            toast.error('Turmas já tem professor alocado!', {
                position: toast.POSITION.TOP_CENTER
            })
        }

    }

    return (
        <UIContainer>
            <Form className='Form' ref={refForm} onSubmit={onSubmit}>

                <div className="div-card">
                    <NavLink to="/dashboard" className="voltar"><BiArrowBack /> Voltar</NavLink>
                    <div className='container-card'>
                        <div>
                            <h1 className="title">Cadastro de professor</h1>
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
                            <select name="turma" id="turma">
                                <option value="Select" selected disabled>Selecione</option>
                                {turmas.map((turma) => (
                                    <option>{turma.nome}</option>
                                ))}
                            </select>
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
                        <div class="" role="alert" id='alert' style={{ marginTop: '2%' }}>

                        </div>
                    </div>
                </div>
            </Form>
        </UIContainer>

    )
}