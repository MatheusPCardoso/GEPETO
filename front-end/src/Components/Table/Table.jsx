import React from 'react';

import UIContainer from '../Container/container';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';
import { Paper, TableBody, TableCell, TableContainer } from '@material-ui/core';
import { Table } from 'react-bootstrap';

export default function _Table(props) {

    console.log(props.status)

    if (props.status != 'loaded') {
        return (
            <UIContainer>
                <TableContainer component={Paper} id='tab'>
                    <Table className="table-hover" >
                        <TableHead>
                            <TableRow>
                            </TableRow>
                        </TableHead>
                        <TableBody id='spin'>
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </TableBody>

                    </Table>

                </TableContainer>

                <Button
                    href="/dashboard"
                    variant="outline-primary"
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
                                    <TableCell
                                        className="turma"
                                        align="center"
                                        contentEditable="false"

                                    >
                                        {row.alunos ? row.alunos + " " : " "}

                                    </TableCell>

                                    <TableCell
                                        align="right">
                                        <Button
                                            variant="danger"
                                            type="submit"
                                            onClick={() => props.func1(row.id)}
                                        >
                                            Apagar
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            onClick={() => props.func2(row)}
                                        >
                                            Alterar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button href="/dashboard" variant="outline-primary" style={{ marginTop: "2%" }}>Voltar</Button>
            </UIContainer>

        )
    }
}