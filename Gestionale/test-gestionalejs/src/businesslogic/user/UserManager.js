import UserLogicException from "../error/UserLogicException";
import User from "./User";

class UserManager {
    #currentUser;
    #userLogged;

    constructor() {
        this.#currentUser = new User(-1, '', false);
        this.#userLogged = false;
    }

    getUserLogged() {
        return this.#userLogged;
    }

    getCurrentUser() {        
        return this.#currentUser;
    }

    async doLogin(username, passwd) {
        this.#currentUser = await User.doLogin(username, passwd);
        this.#userLogged = true;
        return this.#currentUser;
    }

    async doLogout() {
        let ret = false;
        if ( User.doLogout()){
            this.#currentUser = new User(-1, '', false);
            this.#userLogged = false;
            ret = true;
        }
        return ret;
    }

    async loadUserList() {
        if (!this.#currentUser.getIsAdmin()) {
            
            new UserLogicException('error', 'Errore: non ti è permesso visualizzare la lista degli utenti.');
            return [];
        }

        return await this.#currentUser.loadUserList();
    }

    async createNewUser(username, email, password, isadmin) {
        if (!this.#currentUser.getIsAdmin()) {
            new UserLogicException('error', 'Errore: non ti è permesso creare un nuovo utente');
            return ;
        }
        const ret = await User.createNewUser(username, email, password, isadmin);

        return ret;
    }

    async loadUserInfo(id) {
        if (!this.#currentUser.getIsAdmin()) {
            new UserLogicException('error', 'Errore: funzione non permessa');
            return;
        }

        const ret = await User.loadUserInfo(id);
        return ret;
    }
}

export default UserManager;