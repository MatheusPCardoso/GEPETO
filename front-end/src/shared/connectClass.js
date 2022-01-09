import React from "react"
import { useDispatch } from "react-redux"
import { updateTurmaServer } from "./TurmasSlice"

export default function connect(obj, who, turma){

    function UpTurma(turma){
        useDispatch(updateTurmaServer(turma)).then((res) => console.log(res))
    }

    if(who == 'aluno'){
        
            for(var i = 0; i < arrayTurmas.length; i++){
            if(arrayTurmas[i].nome == obj.turma){
                
                //arrayTurmas[i].alunos = obj.nome;

                break
            }
        }
    }
    else if(who == 'professor'){
        let temp = {professor: ''}
        temp.professor = obj.id
        temp = Object.assign({},turma,temp)
            UpTurma(temp)
    }
}
