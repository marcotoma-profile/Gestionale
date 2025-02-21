//import LogicManager from "../businesslogic/LogicManager";
import {Alert} from '@mui/material';
//import CheckIcon from '@mui/icons-material/Check';
import '../css/error/error.css' 
//import { useState, useEffect } from "react";


const Error = ({ message, setError }) => {
    let i = 0; 
     

    return (<div className="error-container">
        {message && message.map(item => {
            return <Alert key={i++} onClick={() => {
                setError(-1);
            }} severity={item[0]}>
                {item[1]}
            </Alert>}) 
        }
    </div>)
}

export default Error;