import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectAllProfessores, fetchProfessores } from '../../shared/ProfessoresSlice'
import { addTurmaServer } from '../../shared/TurmasSlice'


import './Form.css'

import { Form } from '@unform/web'
import Input from '../../Components/Form/Input'
import { NavLink } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import UIContainer from '../../Components/Container/container'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function FormularioTurma() {

    const professores = useSelector(selectAllProfessores)
    const status = useSelector(state => state.professores.status);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchProfessores())
        } else if (status === 'failed') {
            setTimeout(() => dispatch(fetchProfessores()), 5000);
        }
    }, [status, dispatch])

    const refForm = useRef(null);

    function onSubmit(data) {
        var value = document.getElementById('professor')
            .options[document
                .getElementById('professor')
                .selectedIndex].value;

        value == 'Select' ? value = '' : null

        data.professor = value;

        function insertTurma(turma) {
            dispatch(addTurmaServer(turma)).then((res) => {
                if (res.error) {
                    toast.error('Algo deu errado!')
                } else {
                    toast.success('Turma criada com sucesso!', {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
        }

        insertTurma(data)

        refForm.current.reset();
    }

    return (
        <UIContainer>
            <Form className='Form' ref={refForm} onSubmit={onSubmit}>

                <div className="div-card">

                    <div className='container-card'>
                        <div>
                            <h1 className="title" style={{ marginBottom: '2%' }} >Cadastro de turma</h1>
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
                                name='codTurma'
                                id='codTurma'
                                type='text'
                                autoComplete='off'
                                className='form-control'
                                placeholder='Código da turma'
                                required={true}
                            />
                        </div>
                        <div className="cadastro-form">
                            <select name="professor" id="professor">
                                <option value="Select" selected disabled>Selecione</option>
                                {professores.map((professor) => (
                                    <option>{professor.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="cadastro-form">
                            <Input
                                name='dataInicio'
                                id='dataInicio'
                                type='text'
                                className='form-control'
                                autoComplete='off'
                                placeholder='DD/MM/AAAA'
                                required={true}
                            />
                        </div>
                        <div className="cadastro-form">
                            <Input
                                name='dataFim'
                                id='dataFim'
                                type='text'
                                className='form-control'
                                autoComplete='off'
                                placeholder='DD/MM/AAAA'
                                required={true}
                                
                            />
                        </div>

                        <div style={{ display: 'inline-block', marginTop: '2%' }}>
                            <button 
                                type='button' 
                                onClick={() => location.href = '/dashboard'} 
                                className="btn btn-outline-primary me-md-2"
                            >
                                    
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