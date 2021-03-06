import React, { useEffect, useState } from 'react';
import { Question } from '../../Components/Question';
import { NewQuestion } from '../../Components/NewQuestion';
import './styles.css';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addExameServer } from '../ExamesSlice';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const CreateExam = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [questoes, setQuestoes] = useState([]);
    const [nomeProva, setNomeProva] = useState();

    useEffect(() => {
        const tipo = localStorage.getItem('tipo');
        if(!tipo || tipo != 'professores'){
            history.push('/');
        }
    }, [])

    const addQuestion = (tipo, pergunta, options) => {
        setQuestoes([...questoes, {pergunta, tipo, options}]);
    }

    async function salvarProva() {
        dispatch(addExameServer({questoes, nome: nomeProva})).then((res) => {
            toast.success('Prova criada com sucesso!', {
                position: toast.POSITION.TOP_CENTER
            });
            location.href = '/dashboardp'
        });
    }

    const handleNameChange = (event) => {
        setNomeProva(event.target.value);
    }

    const handleRedirect = () => {
        salvarProva()
    }

    return (
        <div className="page">
            <header className="container-fluid header">
                <input className="nome" placeholder="Nome da Prova" value={nomeProva} onChange={handleNameChange} />
                <Edit className="material-icons edit" fontSize="small" />
            </header>
            <div className="container prova d-flex">
                {questoes.map((questao, index) => {
                    const num = index + 1;
                    return <Question key={num} dados={questao} isEditing={true}>{num}</Question>
                })}
                <NewQuestion createNewQuestion={addQuestion} isEditing={true}>{questoes.length + 1}</NewQuestion>
            </div>
            <button type="button" className="btn btn-primary float-end" onClick={() => handleRedirect()}>Salvar</button>
        </div>
    );
}