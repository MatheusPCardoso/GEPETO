//imports
import React, { useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Spinner from '../../Components/spinner/spinner';
import img from '../../assets/images/nothing.png'
import icon from '../../assets/images/tg.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchExames, selectAllExames } from '../ExamesSlice';


function Provas() {
    //Alocando useDispach em const para reutilizar
    const dispatch = useDispatch()
    //Alocando todas as provas na const exames
    const exames = useSelector(selectAllExames)
    //Alocando o status dos exames (loaded, not_loaded, loading ou failed)
    const status = useSelector(state => state.exames.status);

    //Verifica se o status das provas estão como não carregados
    useEffect(() => {
        if (status === 'not_loaded') {
            //Usa o dispatch para dar um GET nos exames
            dispatch(fetchExames())
        }
    }, [status, dispatch]);

    
    //Irá retornar esse HTML caso houver alguma prova criada
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
    //Irá retornar esse HTML caso o status for igual a carregando
    else if (status === 'loading') {
        return (
            <Spinner customText='Loading...' />
        )
    }
    //Irá retornar esse HTML caso nenhuma das condições acima forem satisfeitas
    else {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '5%' }}>
                <img src={img} alt="Nothing here" style={{ height: '60%', width: '60%' }} />
            </div>
        )
    }
}


export default Provas;
