import ExceptionManager from "./error/ExceptionManager";
import PraticheManager from "./pratiche/PraticheManager";
import UserManager from "./user/UserManager";

class LogicManager {

    #userManager;
    #exceptionManager;
    #PraticheManager;

    constructor() {
        this.#userManager = new UserManager();
        this.#exceptionManager = new ExceptionManager();
        this.#PraticheManager = new PraticheManager();
    }
    static #manager;

    static getInstance() {
        if (!this.#manager) {
            this.#manager = new LogicManager();
        }
        return this.#manager;
    }

    getUserManager() {
        return this.#userManager;
    }

    getExceptionManager() {
        return this.#exceptionManager;
    }

    getPraticheManager() {
        return this.#PraticheManager;
    }
}

export default LogicManager;