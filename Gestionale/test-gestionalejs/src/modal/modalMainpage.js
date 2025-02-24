import NewUserModal from "./newUserModal";
import '../css/modal/modalmainpage.css';
import UserInfoModal from "./userInfoModal";


const ModalMainPage = ({ view, setModalVisible, refreshError, setUserList, id }) => {
    
    return (
        <div className="modal-panel">
            <div className="modal-container">
                {view === 'new-user' && <NewUserModal setModalVisible={setModalVisible} 
                    refreshError={refreshError} setUserList={setUserList}/>}
                { view === 'user-info' && <UserInfoModal id={id} setModalVisible={setModalVisible}/>}
            </div>
        </div>
    )
}

export default ModalMainPage;