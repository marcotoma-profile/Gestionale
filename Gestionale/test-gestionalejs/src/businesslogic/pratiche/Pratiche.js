import PersistanceManager from "../../persistance/PersistanceManager";

class Pratica {
    #id;
    #titolo;
    #titolare;
    #incaricato;
    #descrizione;
    #prg_pratica;
    #nomeCliente;

    constructor (data) {
        this.#id = data['id'];
        this.#titolo = data['titolo'];
        this.#titolare = data['titolare']
        this.#descrizione = data['descrizione']; // rappresenta il tipo della pratica
        this.#prg_pratica = data['prg_pratica'];
        this.#incaricato = data['user_name'];
        this.#nomeCliente = data['nome'];
    }

    getId() {
        return this.#id;
    }

    getTitolo() {
        return this.#titolo;
    }

    getTitolare() {
        return this.#titolare;
    }

    getDescrizionePratica() {
        return this.#descrizione;
    }

    getPrgPratica() {
        return this.#prg_pratica;
    }

    getIncaricato() {
        return this.#incaricato;
    }

    getNomeCliente() {
        return this.#nomeCliente;
    }

    static async loadPratiche() {
        const ret = await PersistanceManager.doGet('loadpratiche.php?azione=1&username=m.toselli'); // da cambiare con l'email che è stata utilizzata per il login

        if (ret['error']) {
            // devo gestire il caso di errore
        }
        let retlist = [];
        
        for (let iter of ret['pratiche']) {
            retlist.push(new Pratica(iter));
        }

        return retlist;
    }

    toString() {
        return 'id: ' + this.#id + '\ntitolo: ' + this.#titolo + '\ndesc: ' + this.#descrizione +
            '\nuser: ' + this.#incaricato + '\nnome: ' + this.#nomeCliente;
    }

}

export default Pratica;