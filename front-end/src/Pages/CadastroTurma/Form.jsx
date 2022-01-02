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

export default function FormularioTurma() {

    //const [isClass, setClass] = useState(false);

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

    const refForm = useRef(null); //Referencia do formulario no HTML

    function onSubmit(data) {
        var value = document.getElementById('professor')
            .options[document
                .getElementById('professor')
                .selectedIndex].value;
        
        value == 'Select' ? value = '' : null

        data.professor = value;
        
        async function insertTurma(turma){
            dispatch(addTurmaServer(turma)).then((res) => console.log('turma criado!'))
        }

        insertTurma(data)

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
                                name='turma'
                                id='turma'
                                type='text'
                                autoComplete='off'
                                className='form-control'
                                placeholder='IDTurma'
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

                        <div className="d-flex">


                            <button type="submit" className="btn btn-primary me-md-2">Salvar</button>
                        </div>
                    </div>
                </div>
            </Form>
        </UIContainer>

    )
}