
class ExceptionManager {
    #errorMessage;

    constructor() {
        this.#errorMessage = [];
    }

    getMessage() {
        const ret = this.#errorMessage;
        this.#errorMessage = [];
        return ret;
    }

    addMessage(type, message) {
        this.#errorMessage = [type, message];
    }
}

export default ExceptionManager;