import { Header } from '../../Components/Header';
import { Question } from '../../Components/Question';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamesById, selectAllExames, selectExamesById, updateExameServer } from '../ExamesSlice';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button'

export function Exam(props) {

  const history = useHistory();

  const [type, setType] = useState();
  useEffect(() => setType(localStorage.getItem('tipo')), [type])

  const id = useParams().id;

  const dispatch = useDispatch();
  const [answers, setAnswers] = useState({});

  const status = useSelector((state) => state.exames.status);
  const exames = useSelector(selectAllExames)
  var exame;

  exames.forEach(exa => {
      if(exa._id == id){
        exame = exa
      }
  });

  useEffect(() => {
    if (status === 'not_loaded' || status === 'saved') {
      dispatch(fetchExamesById(id));
    }
  }, [status]);
  
  const questoes = exame?.questoes ?? [];

  const handleAnswer = (res, num) => {
    const newAnswer = { ...answers };
    newAnswer[num] = res;
    setAnswers(newAnswer);
  }

  const enviarProva = (event) => {
    event.preventDefault();
    if (confirm('Tem certeza que deseja enviar a prova?')) {
      history.push('/resultado');
      const userId = localStorage.getItem('userId');
      const exameComRespostas = { ...exame, 'respostas': [] };
      const respostaUser = {};
      respostaUser[userId] = answers;
      exameComRespostas['respostas'].push(respostaUser);
      dispatch(updateExameServer(exameComRespostas));
    }
  }
  return (
    <>
      <Header nome={exame?.nome} />
      <form action="" className="exam">
        {questoes.map((questao, index) => {
          const num = index + 1;
          return <Question key={num} dados={questao} onAnswer={handleAnswer}>{num}</Question>
        })}
        <div id="botao">
          {
            type == 'professores' ?
              <Button type="button" variant="primary" onClick={() => location.href = '/dashboardp'}>
                Home
              </Button>
              :
              <button type="submit" className="botaoEnviar" onClick={enviarProva}>
                Enviar
              </button>
          }
        </div>
      </form>
    </>
  );
}
