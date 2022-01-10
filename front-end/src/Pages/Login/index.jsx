import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { MdEmail, MdLock} from "react-icons/md";
import './login.css';
import { login } from './login.service';
import { useSelector, useDispatch } from "react-redux";
import { fetchExames, selectExamesIds } from '../ExamesSlice';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Login = (props) => {
    const history = useHistory();
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const examesIds = useSelector((state) => selectExamesIds(state));
    const dispatch = useDispatch();

    const checkLoginType = async () => {
        let type, redirectUrl;

        console.log('entrou no Check')
        if(user && user.username){
            console.log('tem usuario')
            type = user.username.split('@')[1].split('.com')[0];
        }
        
        await login(user.username, user.password).then(res => {
            console.log('entrou no login')
            const loggedIn = res.data.token;
            if (type == "alunos") {
                console.log('entrou no if alunos')
                redirectUrl = '/provas';
            }
            else if (type == "professores") {
                console.log('entrou no if professores')
                redirectUrl = '/prova/criar';
            }
            else if (type == "escola") {
                console.log('entrou no if escola')
                redirectUrl = '/dashboard';
            }
            else if  (type == "turmas"){
                console.log('entrou no if turmas')
                redirectUrl = '/cadastro/turmas'

            }
            else{
                console.log('entrou else')
                alert('Usuário não encontrado');
            }
    
            if(loggedIn) {
                localStorage.setItem('token', loggedIn);
                localStorage.setItem('usuario', user.username);
                history.push(redirectUrl);
            }else{
                alert('não')
            }
        })

    }

    function handleInputChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <>
            <div className="login">
                <div className="login-logo">
                    <img src="assets/images/logo.png"></img>
                </div>

                <div className="right">
                    <div id="acess">
                        <h1>Acessar Conta</h1>
                    </div>
                    <form>
                        <div className="loginEmail">
                            <MdEmail />
                            <input type="text" name="username" value={user.username} onChange={handleInputChange} placeholder="Digite um email" id="email" />
                        </div>

                        <div className="loginSenha">
                            <MdLock />
                            <input type="password" name="password" value={user.password} onChange={handleInputChange} placeholder="Digite sua senha" />
                        </div>

                        <Button variant="contained" color="primary" className="button" onClick={() => checkLoginType()}>
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;