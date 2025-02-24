import PersistanceManager from "../../persistance/PersistanceManager";
import UserLogicException from "../error/UserLogicException";

class User {
    #id;
    #user_name;
    #isAdmin;
    #email;
    #attivato;
    #dt_user_added;
    
    constructor (id, user_name, isadmin, email, attivato, dt_user_added) {
        this.#id = id;
        this.#user_name = user_name;
        this.#isAdmin = isadmin;
        this.#attivato = attivato;
        this.#email = email;
        this.#dt_user_added = dt_user_added;
    }
    
    getId() {
        return this.#id;
    }

    getIsAdmin() {
        return this.#isAdmin;
    }

    getUserName() {
        return this.#user_name;
    }

    getEmail() {
        return this.#email;
    }

    getAttivato() {
        return this.#attivato;
    }

    getDtUserAdded() {
        return this.#dt_user_added;
    }

    async loadUserList() {
        /**
         * serve per fare la load degli utenti in modo da poter modificare/aggiungere o eliminare una utenza
         */
        
        const ret = await PersistanceManager.doGet('users.php?azione=1&username='+this.#user_name);
        
        if (ret['error']){
            new UserLogicException('error', ret['errorMessage']);
        }
        const userList = [];
        for (let user of ret['users']) {
            userList.push(new User(user['id'], user['user_name'], user['is_admin']));
        }

        return userList;
    }

    static async doLogin(username, passwd) {
        const data = {username: username, password: passwd};

        const ret = await PersistanceManager.doPost(data, 'login.php');

        if (ret["error"]){
            throw new UserLogicException("error", ret["errorMessage"]);
        }

        const user = new User(ret["user"]["id"], ret["user"]["user_name"], ret["user"]["is_admin"]);
        new UserLogicException("success", "Login avvenuto con successo");
        return user;
    }

    static async doLogout() {
        /**
         * devo pria implementare la sessione di logout dal server
         */
        new UserLogicException('success', "Logout avvenuto con successo");
        return true;
    }

    static async createNewUser(username, email, password, isadmin) {
        /**
         * funzione usata per creare una nuova utenza. Devo ritornare un booleano
         */

        // prima faccio la chiamata al server, poi aggiorno l'id
        const data = {username: username, email: email, password: password, isAdmin: isadmin};
        
        const ret = await PersistanceManager.doPost(data, 'users.php?azione=2');

        if (ret['error']){
            new UserLogicException('error', ret['errorMessage']);
            return;
        }
        
        const userRet = new User(ret['lastId'], username, isadmin);
        new UserLogicException("success", "Utente creato con successo.")
        
        return userRet;
    }

    static async loadUserInfo(id) {
        const ret = await PersistanceManager.doGet('users.php?azione=3&id=' + id);
        
        if (ret['error']) {
            new UserLogicException('error', ret['errorMessage']);
            return;
        }

        const userRet = new User(id, ret['user']['user_name'], ret['user']['is_admin'], ret['user']['email'], ret['user']['attivato'], ret['user']['dt_user_added']);

        return userRet;
    }
}

export default User;