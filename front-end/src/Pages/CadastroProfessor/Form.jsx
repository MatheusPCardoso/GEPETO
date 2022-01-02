import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import './Form.css' 

import { Form } from '@unform/web'
import Input from '../../Components/Form/Input'
import { NavLink } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import UIContainer from '../../Components/Container/container'

import connect from '../../shared/connectClass';

import { fetchTurmas, selectAllTurmas } from '../../shared/TurmasSlice'
import { addProfessorServer } from '../../shared/ProfessoresSlice'


export default function FormularioProfessor() {

    //const [isClass, setClass] = useState(false);

    const refForm = useRef(null); //Referencia do formulario no HTML

    const turmas = useSelector(selectAllTurmas)
    const status = useSelector(state => state.turmas.status);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchTurmas())
        } else if (status === 'failed') {
            setTimeout(() => dispatch(fetchTurmas()), 5000);
        }
    }, [status, dispatch])

    function sendPro(professor,turma){
        dispatch(addProfessorServer(professor))
            .then((res) => connect(res.payload,'professor',turma))
    }

    function onSubmit(data) {
        var select = document.getElementById('turma');
        var value = select.options[select.selectedIndex].value;
        data.turma = value;
        
        let validado = false;
        
        for(var i = 0; i < turmas.length; i++){
            if(turmas[i].professor == '' && turmas[i].nome == data.turma){
                console.log(turmas[i],data)
                sendPro(data, turmas[i])
                validado = true;
            }
        }
        
        if(!validado){
            console.log("Turma já tem professor")
        }

        
        refForm.current.reset();
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
                    </div>
                </div>
            </Form>
        </UIContainer>

    )
}