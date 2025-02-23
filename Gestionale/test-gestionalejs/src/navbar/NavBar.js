import { Box } from "@mui/material";
import "../css/navbar/navbar.css"
import LogicManager from "../businesslogic/LogicManager";
import { useState, useEffect } from "react";

const NavBar = ({ setView, setNews }) => {

    const [userLogged, setUserLogged] = useState(LogicManager.getInstance().getUserManager().getUserLogged());
    const [isadmin, setIsadmin] = useState(LogicManager.getInstance().getUserManager().getCurrentUser().getIsAdmin());

    const doLogout = () => {
        const logout = LogicManager.getInstance().getUserManager().doLogout();
        if (logout) {
            if (setNews)
                setNews(1);
            if (setView)
                setView('login');
        }
    };

    useEffect(() => {
        setIsadmin(LogicManager.getInstance().getUserManager().getCurrentUser().getIsAdmin());
        setUserLogged(LogicManager.getInstance().getUserManager().getUserLogged());
        
    }, [LogicManager.getInstance().getUserManager().getUserLogged(), LogicManager.getInstance().getUserManager().getCurrentUser().getIsAdmin()])

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
            {(userLogged && isadmin) && <div onClick={() => setView('settings')}>Gestisci utenze</div>}
        </div>
        {userLogged && <div className="logout-container" onClick={() => doLogout()}>
            Logout
        </div>}
    </div>;
}

export default NavBar;