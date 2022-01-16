import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExames, selectAllExames } from '../ExamesSlice';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { NavBar } from '../../Components/NavBar/navBar';


export const Provas = () => {

    const provas = useSelector((state) => selectAllExames(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExames());
    }, [])

    console.log(provas)
    return (
        <>
        <NavBar />
        <div className='row' style={{ maxWidth: '960px', height: '88.8vh' , margin: 'auto'}}>
            {
                provas.map(prova => {
                    return (
                        <div className='col-4 mt-5'>
                            <Paper sx={{ 
                                p: 2, 
                                margin: 'auto', 
                                maxWidth: 200, 
                                height: 150, 
                                flexGrow: 1,
                                cursor: 'pointer'

                            }} key={prova.id} onClick={()=> window.location = `/prova/${prova._id}`}>
                                
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography variant= 'button' color="text.primary">
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

export default Provas;
/* <div className="container provas">
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <th scope="col">Id</th>
                    <th scope="col">Nome Prova</th>
                </thead>
                <tbody>
                    {
                        provas.map(prova => {
                            return (
                                <tr key={prova._id}>
                                    <td>{prova._id}</td>
                                    <td>
                                        <NavLink to={`/prova/${prova._id}`}>{prova.nome}</NavLink>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div> */