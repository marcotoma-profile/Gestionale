import PersistanceManager from "../../persistance/PersistanceManager";
import UserLogicException from "../error/UserLogicException";

class User {
    #id;
    #user_name;
    #isAdmin;
    constructor (id, user_name, isadmin,) {
        this.#id = id;
        this.#user_name = user_name;
        this.#isAdmin = isadmin;
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

    description () {
        return "Name: " + this.user_name;
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
}

export default User;