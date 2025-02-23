import LogicManager from "../businesslogic/LogicManager";
import { useState, useEffect } from "react";
import '../css/users/users.css';
import ModalMainPage from "../modal/modalMainpage.js";


const SettingPage = ({ refreshError, setModalView, modalVisible, setModalVisible }) => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        const ret = await LogicManager.getInstance().getUserManager().loadUserList();
        if (ret.length == 0) {
            refreshError(1);
        }
        setUserList(ret);
        setLoading(false);
    }

    const updateUserList = (usr) => {
        setUserList(prev => [...prev, usr]);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="users-container">
             <div className="users-wrapper">
                 <h2 className="users-title">Lista Utenti</h2>
                 {loading ? (
                     <div className="text-center text-gray-500">Caricamento...</div>
                 ) : (
                     <div className="users-grid">
                         {userList.map(usr => (
                             <div 
                                 key={usr.getId()} 
                                 className="user-card"
                             >
                                 <p className="user-name">{usr.getUserName()}</p>
                                 <p className="user-role">
                                     {usr.getIsAdmin() ? (
                                         <span className="admin">Amministratore</span>
                                     ) : (
                                         <span className="non-admin">Non amministratore</span>
                                     )}
                                 </p>
                             </div>
                         ))}
                         <div className="user-card" onClick={() => setModalView('new-user')}>
                            <div className="user-name">
                                +
                            </div>
                            <div className="user-role">
                                Aggiungi un nuovo utente
                            </div>
                         </div>
                     </div>
                 )}
             </div>
             {modalVisible && <ModalMainPage view={'new-user'} 
                setModalVisible={(visib) => setModalVisible(visib)}
                refreshError={(err) => refreshError(err)} setUserList={updateUserList}/>}
         </div>
         
     );
}

export default SettingPage;