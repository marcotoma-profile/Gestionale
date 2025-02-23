import LogicManager from '../businesslogic/LogicManager';
import '../css/modal/newusermodal.css';
import { useState } from "react";

const NewUserModal = ( { setModalVisible, refreshError, setUserList } ) => {
    const [userName, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const precheckValues = () => {
        return userName!=='' && password!=='';
    }

    const createNewUser = async () => {
        if (!precheckValues()) {
            // gestisco il caso in cui ci siano degli errori
            return;
        }
        const ret = await LogicManager.getInstance().getUserManager().createNewUser(userName, userEmail, password, isAdmin);
        console.log(ret);
        
        
        if (ret) {
            setUserList(ret);
            setModalVisible(false);
        }
        refreshError(1);
    }


    return (
        <div className="newuser-modalcontainer">
            <div className="modal-title">
                <h2>Crea un nuovo utente</h2>
            </div>
            <div className="form-container">
                <div className="form-elem">
                    <label>Nome utente *:</label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-elem">
                    <label>Email utente:</label>
                    <input type="text" onChange={(e) => setUserEmail(e.target.value)}/>
                </div>
                <div className="form-elem">
                    <label>Password utente *:</label>
                    <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-elem">
                    <label>Ruolo:</label>
                    <select value={isAdmin} onChange={(e) => setIsAdmin(e.target.value === "true")}>
                        <option value="false">Utente normale</option>
                        <option value="true">Amministratore</option>
                    </select>
                </div>
            </div>
            <div className='button-container'>
                <div className='cancel-btn' onClick={() => setModalVisible(false)}>Annulla</div>
                <div className='confirm-btn' onClick={createNewUser}>Conferma</div>
            </div>
        </div>
    )
}

export default NewUserModal;