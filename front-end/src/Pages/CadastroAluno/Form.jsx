import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import './Form.css'

import { Form } from '@unform/web'
import Input from '../../Components/Form/Input'
import { NavLink } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import UIContainer from '../../Components/Container/container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { addAlunoServer } from '../../shared/AlunosSlice'
import { fetchTurmas, selectAllTurmas, AddTurmaAlunoServer } from '../../shared/TurmasSlice'

export default function FormularioAluno() {

    const refForm = useRef(null); //Referencia do formulario no HTML

    const turmas = useSelector(selectAllTurmas)
    const status = useSelector(state => state.turmas.status);
    const validado = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchTurmas())
        } else if (status === 'failed') {
            setTimeout(() => dispatch(fetchTurmas()), 5000);
        }
    }, [status, dispatch])


    function sendStudentNClass(aluno, turma) {
        console.log('entrou aqui')
        try {
        dispatch(addAlunoServer(aluno))
            .then((res) => {
                
                    let temp = { alunos: {}, who: 'aluno' }
                    temp.alunos = res.payload.nome
                    temp = Object.assign({}, turma, temp)
                    dispatch(AddTurmaAlunoServer(temp))
                        .then((res) => {
                            if(res.error){
                                toast.error('Algo deu errado!')
                            }else{
                                toast.success('Aluno inserido com sucesso!')
                            }
                        })
            })
        }
        catch{
            toast.error("Algo deu errado!")
        }
    }

    function onSubmit(data) {
        var select = document.getElementById('turma');
        var value = select.options[select.selectedIndex].value;
        data.turma = value;


        for (var i = 0; i < turmas.length; i++) {
            if (turmas[i].nome == data.turma) {
                sendStudentNClass(data, turmas[i])
                refForm.current.reset();
            }
        }



    }

    return (
        <UIContainer>
            <Form className='Form' ref={refForm} onSubmit={onSubmit}>

                <div className="div-card">
                    <NavLink to="/dashboard" className="voltar"><BiArrowBack /> Voltar</NavLink>
                    <div className='container-card'>
                        <div>
                            <h1 className="title">Cadastro do aluno</h1>
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
                    </div>
                </div>
            </Form>
        </UIContainer>

    )
}