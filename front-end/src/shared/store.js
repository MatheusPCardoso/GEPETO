import alunosSlice from "./AlunosSlice";
import examesSlice from "../Pages/ExamesSlice";
import professoresSlice from "./ProfessoresSlice";
import { configureStore } from '@reduxjs/toolkit';
import turmasSlice from './TurmasSlice';



export const store = configureStore({
    reducer: {
        alunos: alunosSlice,
        exames: examesSlice,
        professores: professoresSlice,
        turmas: turmasSlice
    }
})