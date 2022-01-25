import React from 'react';

import UIContainer from '../Container/container';
import ValidaPro from './ValidaPro';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, TableBody, TableCell, TableContainer } from '@material-ui/core';
import { Table } from 'react-bootstrap';
import Mode from '../Modal/Modal';
import Button from '@mui/material/Button';
import Mode2 from '../Modal/modal2';

export default function _Table(props) {

    if (props.status == 'loading') {
        return (

            <UIContainer className='container'>
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
                    href={props.href}
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
                <TableContainer component={Paper} >
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
                                            <TableCell className="others" align="center" ontentEditable="false">
                                                {row[title]}
                                            </TableCell>

                                    ))}

                                    {
                                        props.turma ?
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

                                    <TableCell align="right" ontentEditable="false">
                                        {
                                            props.whoEdit == 'Professor' ?
                                                ''
                                                :
                                                <Button
                                                    variant="contained"
                                                    color='error'
                                                    type="submit"
                                                    onClick={() => props.func1(row.id)}
                                                >
                                                    Apagar
                                                </Button>
                                        }
                                    </TableCell>
                                    {props.person[0].alunos || props.whoEdit == 'Professor' ? '' :
                                        <TableCell ontentEditable="false">
                                            <Mode2 row={row} whoEdit={props.whoEdit} />
                                        </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button href={props.href} variant="outlined" style={{ marginTop: "2%" }}>Voltar</Button>
            </UIContainer>
        )
    } else if(props.person.length === 0){
        return (
            <UIContainer>
                <TableContainer component={Paper} id='tab' >
                    <Table className="table-hover" >
                        <TableHead>
                        </TableHead>
                        <TableBody style={{ textAlign: 'center' }}>
                            <h1 style={{ marginTop: '2%' }}>Lista Vazia!</h1>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button href={props.href} variant="outlined" style={{ marginTop: "2%" }}>Voltar</Button>
            </UIContainer>

        )
    }
}