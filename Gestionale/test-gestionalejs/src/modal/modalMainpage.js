import NewUserModal from "./newUserModal";
import '../css/modal/modalmainpage.css';


const ModalMainPage = ({ view, setModalVisible, refreshError, setUserList }) => {
    
    return (
        <div className="modal-panel">
            <div className="modal-container">
                {view === 'new-user' && <NewUserModal setModalVisible={setModalVisible} 
                    refreshError={refreshError} setUserList={setUserList}/>}
            </div>
        </div>
    )
}

export default ModalMainPage;