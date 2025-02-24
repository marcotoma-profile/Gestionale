import LogicManager from "../businesslogic/LogicManager";
import { useState, useEffect, use } from "react";
import '../css/modal/userinfomodal.css';
import User from "../businesslogic/user/User";


const UserInfoModal = ({ id, setModalVisible }) => {
    const [userInfo, setUserInfo] = useState();
    const [modifica, setModifica] = useState(false);
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [attivato, setAttivato] = useState(false);

    const checkUserInfoChange = () => {
        return email !== userInfo.getEmail() || isAdmin !== userInfo.getIsAdmin() || attivato !== userInfo.getAttivato();
    }

    const updateUserInfo = async () => {
        // modifica le informazioni dell'utente
        if (checkUserInfoChange()) {
            console.log('informazioni modificate');
            const newInfoUser = new User(userInfo.getId(), userInfo.getUserName(), isAdmin, email, attivato, userInfo.getDtUserAdded());
        }
    }

    const loadInfo = async () => {
        const ret = await LogicManager.getInstance().getUserManager().loadUserInfo(id);

        if (ret) {
            setUserInfo(ret);
            resetValues(ret);
        }
    }

    const resetValues = (ret) => {
        
        if (ret) {
            setIsAdmin(ret.getIsAdmin());
            setAttivato(ret.getAttivato());
            setEmail(ret.getEmail());
            
        }
    }

    useEffect(() => {
        loadInfo();
    }, []);

    return (
        <div className='userinfo-container'>
            <div className="userinfo-title">
                {userInfo!== undefined ? userInfo.getUserName() : "Caricamento..."}
            </div>
            <div className="userinfo-card">
                <div className="user-info">
                    <label>Email: </label>
                    {modifica ? <input type="text" value={email} onChange={(e) => setEmail(e.target.value) }/> : <p>{userInfo ? (userInfo.getEmail() === '' ? 'Nessuna email' : userInfo.getEmail()) : "Caricamento..."}</p>}
                </div>
                <div className="user-info">
                    <label>Ruolo utente: </label>
                    {modifica ? <div className="isadmin-btn" onClick={() => setIsAdmin(prev => !prev)}>{isAdmin ? 'Amministratore' : 'Utente'}</div> : <p>{userInfo ? (userInfo.getIsAdmin() ? 'Amministratore' : 'Utente') : "Caricamento..."}</p>}
                </div>
                <div className="user-info">
                    <label>Stato utente: </label>
                    {modifica ? <div className="isadmin-btn" onClick={() => setAttivato(prev => !prev)}>{attivato ? 'Attivo' : 'Disattivo'}</div> :<p>{userInfo ? (userInfo.getAttivato() ? 'Attivo' : 'Disattivo') : "Caricamento..."}</p>}
                </div>
            </div>
            <div className='button-container'>
                <div className='cancel-btn' onClick={() => {
                    if (modifica){
                        resetValues()
                        setModifica(false);
                    }
                    else
                        setModalVisible(false);
                    }}>Annulla</div>
                <div className='edit-btn' onClick={() => {
                    if (modifica) {
                        updateUserInfo();
                    }
                    else {
                        setModifica(true);
                    }
                }}>{modifica ? 'Salva' : 'Modifica'}</div>
            </div>
        </div>
    )
}

export default UserInfoModal;