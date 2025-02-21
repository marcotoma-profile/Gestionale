import User from "./User";

class UserManager {
    #currentUser = null;
    #userLogged = false;

    userLogged() {
        return this.#userLogged;
    }

    async doLogin(username, passwd) {
        this.#currentUser = await User.doLogin(username, passwd);
        this.#userLogged = true;
        return this.#currentUser;
    }

    async doLogout() {
        let ret = false;
        if ( User.doLogout()){
            this.#currentUser = null;
            this.#userLogged = false;
            ret = true;
        }
        return ret;
    }
}

export default UserManager;