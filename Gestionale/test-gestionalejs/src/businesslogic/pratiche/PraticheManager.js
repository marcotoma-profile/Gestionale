import Pratica from "./Pratiche";

class PraticheManager {
    
    #listapratiche;
    #ultimapratica;

    constructor () {
        this.#listapratiche = [];
        this.#ultimapratica = -1;
    }

    hasPratiche() {
        /**
         * ritorna true se ci sono delle pratiche assegnate all'utente
         */
        return this.#listapratiche.length > 0;
    }

    getPratiche() {
        return this.#listapratiche;
    }

    async loadPratiche(email) {
        /**
         * serve per gestire il load delle pratiche. poi dovrà prendere in input la mail dell'utente loggato
         */
        const ret = await Pratica.loadPratiche();
        this.#listapratiche = ret;
        return this.#listapratiche;
    }

    temp() {
        let ret = [];
        for (let iter of this.#listapratiche){
            ret.push(iter.toString());
        }
        return ret;
    }

    updateUltimaPratica() {
        for (let iter of this.#listapratiche){

        }
    }
}

export default PraticheManager;