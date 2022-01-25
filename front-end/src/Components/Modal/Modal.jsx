import React, { useEffect } from "react";

import { selectAllAlunos, fetchAlunos } from '../../shared/AlunosSlice'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";


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

export default function Mode(props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const alunos = useSelector(selectAllAlunos)
    const status = useSelector(state => state.alunos.status);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchAlunos())
        } else if (status === 'failed') {
            //setTimeout(() => dispatch(fetchAlunos()), 2000);
        }
    }, [status, dispatch])

    if(props.professorTurma){
        var arrayAlunos = []
        alunos.map(aluno => {
            if(aluno.turma == props.professorTurma){
                arrayAlunos.push(aluno)
            }
        })
        alunos = arrayAlunos;
        console.log(alunos)
    }

    if (alunos.length != 0) {
        return (

            <>
                < Button onClick={handleOpen} > Ver alunos</Button >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        {alunos.map((row) => (

                                            row.turma == props.turma ?
                                                    <TableCell style={{display: 'block', textAlign: 'left'}}>
                                                        {row.nome}
                                                    </TableCell>

                                                :
                                                console.log(props.turma)
                                        ))}

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Modal>
            </>
        )
    }
    else {
        return (

            <>
                < Button onClick={handleOpen} > Ver alunos</Button >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                </TableHead>
                                <TableBody>
                                    <TableCell>
                                        LISTA VAZIA!
                                    </TableCell>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Modal>
            </>
        )
    }

}