import "../css/login/login.css";
import {TextField, Button } from '@mui/material';
import { useState } from "react";
import LogicManager from "../businesslogic/LogicManager";


const Login = ({ setView, setError }) => {

    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");

    const doLogin = async () => {
        try {
            await LogicManager.getInstance().getUserManager().doLogin(username, passwd);
            setError(1);
             setView('mainpage');
            //window.location.href = "/src/mainpage/index.html";
            } catch (UserLogicException) {           
            setError(1);
        }           
    }

    return <div className="login-page">
        <div className="login-container">
            <div className="login-title">
                Login
            </div>
            <div className="login-form">
                <TextField variant="outlined" label="Username" onChange={(name) => setUsername(name.target.value)}/>
                <TextField variant="outlined" label="Password" type="password" onChange={(passwd) => setPasswd(passwd.target.value)}/>
                <Button variant="outlined" onClick={() => doLogin()}>Test Connection</Button> 
            </div>
        </div>
    </div>
}

export default Login;