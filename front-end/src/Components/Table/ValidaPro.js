import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { selectAllProfessores, fetchProfessores } from "../../shared/ProfessoresSlice";
import { TableCell } from '@material-ui/core';

export default function ValidaPro(props) {

    const professores = useSelector(selectAllProfessores)
    const status = useSelector(state => state.professores.status);
    var existe = 'Sem professor';

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchProfessores())
        } else if (status === 'failed') {
            setTimeout(() => dispatch(fetchProfessores()), 5000);
        }
    }, [status, dispatch])

    professores.forEach(professor => {
        console.log(props.turma)
        if (professor.codTurma == props.turma) {
            existe = professor.nome
        }
    });

    return (
        <TableCell
            className="turma"
            align="center">
            {existe}
        </TableCell>
    )
}