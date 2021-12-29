import React, { useState } from 'react';
import './index.css';
import ListagemAluno from "../Aluno/ListagemAluno";

const turma = (props) => {
    return(

        <div className='turma'>
            <ListagemAluno />
        </div>
        


    );
}

export default turma;

