import { Box } from "@mui/material";
import "../css/navbar/navbar.css"
import LogicManager from "../businesslogic/LogicManager";

const NavBar = ({ setView, setNews }) => {

    const doLogout = () => {
        const logout = LogicManager.getInstance().getUserManager().doLogout();
        if (logout) {
            if (setNews)
                setNews(1);
            if (setView)
                setView('login');
        }
    };
    

    return <div className="navbar-container">
            <Box
        component="img"
        src="https://sca.it/wp-content/uploads/2017/12/logo.jpg"
        alt="Immagine di esempio"
        sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 4,
            boxShadow: 3,
        }}
        />
        <div className="navbar-items">
            <div>prova</div>
            <div>prova</div>
            <div onClick={() => setView('settings')}>Gestisci utenze</div>
        </div>
        {LogicManager.getInstance().getUserManager().getUserLogged() && <div className="logout-container" onClick={() => doLogout()}>
            Logout
        </div>}
    </div>;
}

export default NavBar;