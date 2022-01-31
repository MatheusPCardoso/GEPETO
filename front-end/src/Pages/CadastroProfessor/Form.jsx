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

import { fetchTurmas, selectAllTurmas } from '../../shared/TurmasSlice'
import { addProfessorServer, fetchProfessores, selectAllProfessores } from '../../shared/ProfessoresSlice'

toast.configure()

export default function FormularioProfessor() {
    const refForm = useRef(null)
    const turmas = useSelector(selectAllTurmas)
    const professores = useSelector(selectAllProfessores)
    const statusP = useSelector(state => state.professores.status);
    const status = useSelector(state => state.turmas.status);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchTurmas())
        } else if (status === 'failed') {
            toast.error('Erro ao dar get na turma')
        }
    }, [status, dispatch])

    useEffect(() => {
        if (statusP === 'not_loaded') {
            dispatch(fetchProfessores())
        } else if (statusP === 'failed') {
            toast.error('Erro ao dar get no professor')
        }
    }, [statusP, dispatch])

    function sendProNClass(professor) {

        dispatch(addProfessorServer(professor))
            .then((res) => {
                if (res.error) {
                    toast.error('Algo deu errado!', {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                else {
                    toast.success('Professor criado com sucesso!', {
                        position: toast.POSITION.TOP_CENTER
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
        var livre = true;

        for (let j = 0; j < professores.length; j++) {
            if (professores[j].codTurma == data.codTurma) {
                livre = false
                break
            } else {
                livre = true
            }
        }

        for (let i = 0; i < turmas.length; i++) {
            if (livre && turmas[i].nome == data.codTurma) {
                sendProNClass(data)
                refForm.current.reset();
                validado = true
            }
        }

        if (data.codTurma == 'Select') {
            toast.warning('Selecione uma turma para o professor!', {
                position: toast.POSITION.TOP_CENTER
            })
            validado = true
        }
        else if(!validado){
            toast.error('Turma selecionada já tem professor alocado.', {
                position: toast.POSITION.TOP_CENTER
            })
        }

    }

    return (
        <UIContainer>
            <Form className='Form' ref={refForm} onSubmit={onSubmit}>

                <div className="div-card">
                    <div className='container-card'>
                        <div>
                            <h1 className="title" style={{ marginBottom: '2%' }}>Cadastro de professor</h1>
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

                        <div style={{ display: 'inline-block', marginTop: '2%' }}>
                            <button 
                                type='button' 
                                onClick={() => location.href = '/dashboard'}
                                className="btn btn-outline-primary me-md-2">
                                <BiArrowBack /> Voltar
                            </button>
                        </div>
                        <div style={{ float: 'right', marginTop: '2%' }}>
                            <button type="submit" className="btn btn-primary me-md-2">Salvar</button>
                        </div>
                    </div>
                </div>
            </Form>
        </UIContainer>

    )
}