import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExames, selectAllExames } from '../ExamesSlice';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { NavBar } from '../../Components/NavBar/navBar';
import { GoBook } from "react-icons/go";
import img from '../../assets/images/nothing.png'

export const Provas = () => {



    const provas = useSelector((state) => selectAllExames(state));
    const [type, setType] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        const usuario = localStorage.getItem('usuario');
        setType(localStorage.getItem('tipo'));
    }, []);
    const isProf = () => type == 'professores';


    useEffect(() => {
        dispatch(fetchExames());
    }, [])
    if (provas.length != 0) {

        return (
            <>
                <NavBar hidden={isProf()} />
                <div className='row' style={{ padding: '50px 100px 50px 100px', height: '88.8vh' }}>
                    {
                        provas.map(prova => {
                            return (
                                <div className='col-3 mt-5'>
                                    <Paper sx={{
                                        p: 2,
                                        margin: 'auto',
                                        maxWidth: 200,
                                        height: 150,
                                        flexGrow: 1,
                                        cursor: 'pointer'

                                    }} key={prova.id} onClick={() => window.location = `/prova/${prova._id}`}>

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm container>
                                                <Grid item xs container direction="column" spacing={1}>
                                                    <Grid item xs style={{ textAlign: 'center' }}>
                                                        <GoBook style={{ fontSize: '50px' }} />
                                                    </Grid>
                                                    <Grid item xs style={{ textAlign: 'center', marginTop: '1rem' }}>
                                                        <Typography variant='button' color="text.primary">
                                                            {prova.nome}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </div>
                            )
                        })
                    }

                </div>
            </>

        )
    }
    else {
        return (
            <div style={{display: 'flex', justifyContent: 'center', margin: '5%'}}>
                <img src={img} alt="Nothing here" style={{height: '60%', width: '60%'}}/>
            </div>
        )
    }
}

export default Provas;
