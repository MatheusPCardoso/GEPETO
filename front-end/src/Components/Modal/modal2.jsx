import React, { useEffect, useState } from "react";
import { fetchAlunos, selectAllAlunos, updateAlunoServer } from '../../shared/AlunosSlice'
import { fetchProfessores, selectAllProfessores, updateProfessorServer } from '../../shared/ProfessoresSlice'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Mode2(props) {
    const dispatch = useDispatch();
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const alunos = useSelector(selectAllAlunos)
    const statusAlu = useSelector(state => state.alunos.status);
    const professores = useSelector(selectAllProfessores)
    const statusProf = useSelector(state => state.professores.status);

    const [nome, setNome] = useState('')
    const [user, setUser] = useState('')
    
    
    let temp = props.row;

    useEffect(() => {
        if (statusAlu === 'not_loaded') {
            dispatch(fetchAlunos())
        } else if (statusAlu === 'failed') {
            console.log('Algo deu errado no status do aluno')
        }
    }, [statusAlu, dispatch])

    useEffect(() => {
        if (statusProf === 'not_loaded') {
            dispatch(fetchProfessores())
        } else if (statusProf === 'failed') {
            setTimeout(() => dispatch(fetchProfessores()), 5000);
        }
    }, [statusProf, dispatch])


    function handleSubmit() {
        if (props.whoEdit == 'Alunos') {

            if (user && nome) {
                let objUp = {
                    ...temp,
                    username: user,
                    nome: nome
                }

                dispatch(updateAlunoServer(objUp)).then((res) => {
                    if (res.error) {
                        toast.error('Algo deu errado!')
                    } else {
                        handleClose()
                        toast.success('Alteração feita com sucesso!', {
                            position: toast.POSITION.TOP_CENTER
                        })
                        dispatch(fetchAlunos())
                    }
                })
            } else if (user && !nome) {
                let objUp = {
                    ...temp,
                    username: user
                }
                dispatch(updateAlunoServer(objUp)).then((res) => {
                    if (res.error) {
                        toast.error('Algo deu errado!')
                    } else {
                        handleClose()
                        toast.success('Alteração feita com sucesso!', {
                            position: toast.POSITION.TOP_CENTER
                        })
                        dispatch(fetchAlunos())
                    }
                })
            } else if (!user && nome) {
                let objUp = {
                    ...temp,
                    nome: nome
                }
                dispatch(updateAlunoServer(objUp)).then((res) => {
                    if (res.error) {
                        toast.error('Algo deu errado!')
                    } else {
                        handleClose()
                        toast.success('Alteração feita com sucesso!', {
                            position: toast.POSITION.TOP_CENTER
                        })
                        dispatch(fetchAlunos())
                    }
                })
            } else {
                toast.info('Nenhuma alteração detectada!')
            }

        } else {

            if (user && nome) {
                let objUp = {
                    ...temp,
                    username: user,
                    nome: nome
                }
                dispatch(updateProfessorServer(objUp)).then((res) => {
                    if (res.error) {
                        toast.error('Algo deu errado!')
                    } else {
                        handleClose()
                        toast.success('Alteração feita com sucesso!', {
                            position: toast.POSITION.TOP_CENTER
                        })
                        dispatch(fetchProfessores())
                    }
                })
            } else if (user) {
                let objUp = {
                    ...temp,
                    username: user
                }
                dispatch(updateProfessorServer(objUp)).then((res) => {
                    if (res.error) {
                        toast.error('Algo deu errado!')
                    } else {
                        handleClose()
                        toast.success('Alteração feita com sucesso!', {
                            position: toast.POSITION.TOP_CENTER
                        })
                        dispatch(fetchProfessores())
                    }
                })
            } else if (nome) {
                let objUp = {
                    ...temp,
                    nome: nome
                }
                dispatch(updateProfessorServer(objUp)).then((res) => {
                    if (res.error) {
                        toast.error('Algo deu errado!')
                    } else {
                        handleClose()
                        toast.success('Alteração feita com sucesso!', {
                            position: toast.POSITION.TOP_CENTER
                        })
                        dispatch(fetchProfessores())
                    }
                })
            } else {
                toast.info('Nenhuma alteração detectada!')
            }
        }

    }

    if (alunos.length != 0) {
        return (

            <>
                < Button variant="contained" onClick={handleOpen} >Editar</Button >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <h3 style={{ marginBottom: '2%' }}>Edição</h3>

                        <TextField
                            onChange={(e) => setUser(e.target.value)}
                            id="user"
                            label="User"
                            defaultValue={temp.username}
                        />
                        <TextField
                            onChange={(e) => setNome(e.target.value)}
                            id="user"
                            label="User"
                            defaultValue={temp.nome}
                        />

                        <div style={{ marginTop: '2%' }}>
                            < Button variant="contained" onClick={handleSubmit} >Enviar</Button >
                        </div>
                    </Box>

                </Modal>
            </>
        )
    }else if (professores.length != 0) {
        return (

            <>
                < Button variant="contained" onClick={handleOpen} >Editar</Button >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <h3 style={{ marginBottom: '2%' }}>Edição</h3>

                        <TextField
                            onChange={(e) => setUser(e.target.value)}
                            id="user"
                            label="User"
                            defaultValue={temp.username}
                        />
                        <TextField
                            onChange={(e) => setNome(e.target.value)}
                            id="user"
                            label="User"
                            defaultValue={temp.nome}
                        />

                        <div style={{ marginTop: '2%' }}>
                            < Button variant="contained" onClick={handleSubmit} >Enviar</Button >
                        </div>
                    </Box>

                </Modal>

            </>
        )
    } else {
        <>
                < Button variant="contained" onClick={handleOpen} >Editar</Button >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                        <h3 style={{ marginBottom: '2%' }}>Lista Vazia!</h3>
                    </Box>

                </Modal>

            </>
    }
}