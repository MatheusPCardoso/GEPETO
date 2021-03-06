import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import { httpDelete, httpGet, httpPut, httpPost } from './utils'
import { baseUrl } from './baseUrl'

const turmasAdapter = createEntityAdapter();

const initialState = turmasAdapter.getInitialState({
    status: 'not_loaded',
    error: null
    /* o array turmas foi removido do state inicial, será criado pelo adapter */
});

export const fetchTurmas = createAsyncThunk('turmas/fetchTurmas', async (_, { getState }) => {
    return await httpGet(`${baseUrl}/turmas`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
});

export const deleteTurmaServer = createAsyncThunk('turmas/deleteTurmaServer', async (idTurma, { getState }) => {
    await httpDelete(`${baseUrl}/turmas/${idTurma}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
    return idTurma;
});

export const addTurmaServer = createAsyncThunk('turmas/addTurmaServer', async (turma, { getState }) => {
    return await httpPost(`${baseUrl}/turmas`, turma, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
});
export const updateTurmaServer = createAsyncThunk('turma/updateTurmaServer', async (turma, { getState }) => {
    return await httpPut(`${baseUrl}/turmas/${turma.id}`, turma, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
});

export const AddTurmaAlunoServer = createAsyncThunk('turma/addAlunoServer', async (turma, { getState }) => {
    return await httpPut(`${baseUrl}/turmas/addAluno/${turma.id}`, turma, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
});

export const turmasSlice = createSlice({
    name: 'turmas',
    initialState: initialState,
    extraReducers: {
        [fetchTurmas.pending]: (state, action) => { state.status = 'loading' },
        [fetchTurmas.fulfilled]: (state, action) => { state.status = 'loaded'; turmasAdapter.setAll(state, action.payload); },
        [fetchTurmas.rejected]: (state, action) => { state.status = 'failed'; state.error = action.error.message },
        [deleteTurmaServer.pending]: (state, action) => { state.status = 'loading' },
        [deleteTurmaServer.fulfilled]: (state, action) => { state.status = 'deleted'; turmasAdapter.removeOne(state, action.payload); },
        [addTurmaServer.pending]: (state, action) => { state.status = 'loading' },
        [addTurmaServer.fulfilled]: (state, action) => { state.status = 'saved'; turmasAdapter.addOne(state, action.payload); },
        [updateTurmaServer.pending]: (state, action) => { state.status = 'loading' },
        [updateTurmaServer.fulfilled]: (state, action) => { state.status = 'saved'; turmasAdapter.upsertOne(state, action.payload); },
        [AddTurmaAlunoServer.pending]: (state, action) => { state.status = 'loading' },
        [AddTurmaAlunoServer.fulfilled]: (state, action) => { state.status = 'saved'; turmasAdapter.upsertOne(state, action.payload); },
    },
})

export default turmasSlice.reducer

export const {
    selectAll: selectAllTurmas,
    selectById: selectTurmasById,
    selectIds: selectTurmasIds
} = turmasAdapter.getSelectors(state => state.turmas)