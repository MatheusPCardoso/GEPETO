import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfessores, selectAllProfessores } from "../../shared/ProfessoresSlice";
import { fetchTurmas, selectAllTurmas } from "../../shared/TurmasSlice";
import { fetchAlunos, selectAllAlunos } from "../../shared/AlunosSlice";
import Spinner from "../spinner/spinner";
import { fetchExames, selectAllExames } from "../../Pages/ExamesSlice";
import { toast } from "react-toastify";



export function PieChart(props) {

  const dispatch = useDispatch()

  const turmas = useSelector(selectAllTurmas)
  const statusTurma = useSelector(state => state.turmas.status);

  useEffect(() => {
    if (statusTurma === 'not_loaded') {
      dispatch(fetchTurmas())
    } else if (statusTurma === 'failed') {
      setTimeout(() => console.log('Algou deu errado!'));
    }
  }, [statusTurma, dispatch])

  const professores = useSelector(selectAllProfessores)
  const statusProfessores = useSelector(state => state.professores.status);

  useEffect(() => {
    if (statusProfessores === 'not_loaded') {
      dispatch(fetchProfessores())
    } else if (statusProfessores === 'failed') {
      setTimeout(() => console.log('Algou deu errado!'));
    }
  }, [statusProfessores, dispatch])

  const alunos = useSelector(selectAllAlunos)
  const statusAlunos = useSelector(state => state.alunos.status);

  useEffect(() => {
    if (statusAlunos === 'not_loaded') {
      dispatch(fetchAlunos())
    } else if (statusAlunos === 'failed') {
      console.log('algo deu errado!')
    }
  }, [statusAlunos, dispatch])

  const provas = useSelector(selectAllExames)
  const statusProvas = useSelector(state => state.exames.status);

  useEffect(() => {
    if (statusProvas == 'not_loaded') {
      dispatch(fetchExames())
    } else {
      toast.error('Algo deu errado com os exames!')
    }
  }, [statusProvas, dispatch])


  var dataTurmas = [
    ['nome', "quantidade"],
  ];
  var dataAlunos = [
    ['nome', "quantidade"],
  ];
  var dataProfessores = [
    ['nome', "quantidade"],
  ];

  const optionsTurmas = {
    title: 'Turmas',
    is3D: true,
  };
  const optionsProfessores = {
    title: 'Professores',
    is3D: true,
  };
  const optionsAlunos = {
    title: 'Alunos',
    is3D: true,
  };
  const optionsExames = {
    title: 'Provas',
    is3D: true,
  };

  alunos.map(aluno => dataAlunos.push([aluno.nome, 1]))
  turmas.map(turma => dataTurmas.push([turma.nome, 1]))
  professores.map(professor => dataProfessores.push([professor.nome, 1]))

  if (statusAlunos == 'loading' || statusProfessores == 'loading' || statusTurma == 'loading') {
    return (
      <Spinner customText='loading...' />
    )
  } else {
    return (
      <div style={{
        display: 'grid',
        marginLeft: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        gridAutoRows: '450px',
        gridTemplateColumns: 'repeat(2, 700px)'
      }}>
        {/* {
          props.graficos.map((grafico) => {
            <div style={{ maxWidth: '600px', boxShadow: '5px 5px 5px #A9A9A9	' }}>
              <Chart
                chartType="PieChart"
                data={grafico.data}
                options={grafico.options}
                width={"100%"}
                height={"343px"}
              />
            </div>
          })
        } */}

      </div>
    );
  }

}

{/* <div style={{ maxWidth: '600px', boxShadow: '5px 5px 5px #A9A9A9	' }}>
            <Chart
              chartType="PieChart"
              data={dataAlunos}
              options={optionsAlunos}
              width={"100%"}
              height={"343px"}
            />
          </div>
          <div style={{ maxWidth: '600px', boxShadow: '5px 5px 5px #A9A9A9	' }}>
            <Chart
              chartType="PieChart"
              data={dataTurmas}
              options={optionsTurmas}
              width={"100%"}
              height={"343px"}
            />
          </div>
          <div style={{ maxWidth: '600px', boxShadow: '5px 5px 5px #A9A9A9	' }}>
            <Chart
              chartType="PieChart"
              data={dataProfessores}
              options={optionsProfessores}
              width={"100%"}
              height={"343px"}
              dataT
            />
          </div> */}