import PersistanceManager from "../../persistance/PersistanceManager";
import UserLogicException from "../error/UserLogicException";

class User {
    #id;
    #email;
    #user_name;
    #isAdmin;
    constructor (id, user_name, isadmin,) {
        this.#id = id;
        this.#user_name = user_name;
        this.#isAdmin = isadmin;
    }

    getIsAdmin() {
        return this.#isAdmin;
    }

    getUserName() {
        return this.#user_name;
    }

    description () {
        return "Name: " + this.user_name;
    } 

    static async doLogin(username, passwd) {
        const data = {username: username, password: passwd};

        const ret = await PersistanceManager.doPost(data, 'login.php');

        if (ret["error"]){
            throw new UserLogicException("error", ret["errorMessage"]);
        }

        const user = new User(ret["user"]["id"], ret["user"]["user_name"], ret["user"]["isAdmin"]);
        new UserLogicException("success", "Login avvenuto con successo");
        if (ret["redirect"]) {
            window.location.href = ret["redirect"];
        }
        return user;
    }

    static async doLogout() {
        /**
         * devo pria implementare la sessione di logout dal server
         */
        new UserLogicException('success', "Logout avvenuto con successo");
        return true;
    }

    static async loadUserList() {
        /**
         * serve per fare la load degli utenti in modo da poter modificare/aggiungere o eliminare una utenza
         */
        
    }
}

export default User;