import React from 'react';

import UIContainer from '../Container/container';
import ValidaPro from './ValidaPro';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, TableBody, TableCell, TableContainer } from '@material-ui/core';
import { Table } from 'react-bootstrap';
import Mode from '../Modal/Modal';
import Button from '@mui/material/Button';


export default function _Table(props) {



    if (props.status == 'loading') {
        return (
            <UIContainer>
                <TableContainer component={Paper} id='tab'>
                    <Table className="table-hover" >
                        <TableHead>
                            <TableRow>
                            </TableRow>
                        </TableHead>
                        <TableBody id='spin'>
                            <div class="spinner-border" role="status" style={{ marginTop: '2%' }}>
                                <span class="sr-only"></span>
                            </div>
                            <span>  {props.status}...</span>
                        </TableBody>

                    </Table>

                </TableContainer>

                <Button
                    href="/dashboard"
                    variant="outlined"
                    style={{ marginTop: "2%" }}
                >
                    Voltar
                </Button>

            </UIContainer>


        )
    }
    else if (props.person.length != 0) {
        return (
            <UIContainer>
                <TableContainer component={Paper} id='tab'>
                    <Table className="table-hover" >
                        <TableHead>
                            <TableRow>
                                {props.title.map((title) =>
                                    <TableCell align='center'>{title}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.person.map((row) => (
                                <TableRow key={row.id}>
                                    {props.row.map((title) => (
                                        title == 'turma' ?
                                            <TableCell className="turma" align="center" contentEditable="false">
                                                {row[title]}
                                            </TableCell>
                                            :
                                            <TableCell className="others" align="center" contentEditable="true">
                                                {row[title]}
                                            </TableCell>

                                    ))}

                                    {
                                        props.turma == true ?
                                        <ValidaPro turma={row.nome} />
                                        :
                                        ''
                                    }
                                    

                                    <TableCell
                                        className="turma"
                                        align="center"
                                        contentEditable="false"

                                    >
                                        {row.alunos ?
                                            <div>
                                                <Mode turma={row.nome} />
                                            </div>
                                            :
                                            " "}

                                    </TableCell>

                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color='error'
                                            type="submit"
                                            onClick={() => props.func1(row.id)}
                                        >
                                            Apagar
                                        </Button>
                                    </TableCell>
                                    {props.person[0].alunos ? '' :
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                onClick={() => props.func2(row)}
                                            >
                                                Alterar
                                            </Button>
                                        </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button href="/dashboard" variant="outlined" style={{ marginTop: "2%" }}>Voltar</Button>
            </UIContainer>

        )
    } else {
        return (
            <UIContainer>
                <TableContainer component={Paper} id='tab'>
                    <Table className="table-hover" >
                        <TableHead>
                        </TableHead>
                        <TableBody style={{ textAlign: 'center' }}>
                            <h1 style={{ marginTop: '2%' }}>Lista Vazia!</h1>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button href="/dashboard" variant="outlined" style={{ marginTop: "2%" }}>Voltar</Button>
            </UIContainer>

        )
    }
}