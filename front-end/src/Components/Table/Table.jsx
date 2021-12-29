import React from 'react';

import UIContainer from '../Container/container';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from 'react-bootstrap/Button';
import { Paper, TableBody, TableCell, TableContainer } from '@material-ui/core';
import { Table } from 'react-bootstrap';

export default function _Table(props) {



    console.log(props.person)
    if (props.status == 'loading') {
        return (
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }
    else if (props.person.length != 0) {
        return (
            <UIContainer>
                <TableContainer component={Paper} id='tab'>
                    <Table className="table-hover" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Turma</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.person.map((row) => (
                                <TableRow key={row.id} >
                                    <TableCell className="turma" align="center" contentEditable="false">
                                        {row.turma}
                                    </TableCell>
                                    <TableCell className="username" align="center" contentEditable="true" >
                                        {row.username}
                                    </TableCell>
                                    <TableCell className="nome" align="center" contentEditable="true" >
                                        {row.nome}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row}
                                    </TableCell>
                                    <TableCell align="right"><Button variant="danger" type="submit" onClick={() => props.func1(row.id)}>Apagar</Button></TableCell>
                                    <TableCell><Button variant="primary" type="submit" onClick={() => props.func2(row)}>Alterar</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button href="/dashboard" variant="outline-primary" style={{ marginTop: "2%" }}>Voltar</Button>
            </UIContainer>
        ) 
    }
    else {
        console.log(props.person,props.func1,props.func2,props.status)

        return(
            <h1>ok</h1>
        )
    }
}