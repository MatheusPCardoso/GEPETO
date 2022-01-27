import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExames, selectAllExames } from '../ExamesSlice';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import img from '../../assets/images/nothing.png'
import icon from '../../assets/images/tg.png'
import Spinner from '../../Components/spinner/spinner';

function Provas() {

    const dispatch = useDispatch()
    const exames = useSelector(selectAllExames)
    const status = useSelector(state => state.exames.status);

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchExames())
        }
    }, [status, dispatch]);



    if (exames.length) {
        return (
            <>
                <div className='row' style={{ padding: '50px 100px 50px 100px', height: '88.8vh' }}>
                    {
                        exames.map(prova => {
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
                                                        <img src={icon} alt="" />
                                                    </Grid>
                                                    <Grid item xs style={{ textAlign: 'center', marginTop: '0.5rem' }}>
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
    else if (status === 'loading') {
        return (
            <Spinner customText='Loading...' />
        )
    }
    else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '5%' }}>
                <img src={img} alt="Nothing here" style={{ height: '60%', width: '60%' }} />
            </div>
        )
    }
}


export default Provas;
