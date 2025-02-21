

class PersistanceManager {

     static urlbackend = "http://localhost:8000/test-gestionalejs/php/"; // da usare quando si usa npm start
    // static urlbackend = "http://localhost/php/"; // da usare quando si fa una build

    static async doGet (phpfile) {
        
        const response = await fetch(this.urlbackend+phpfile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data
    }

    static async doPost(data, phpfile) {
        const response = await fetch(this.urlbackend+phpfile, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        return await response.json();
    }
}

export default PersistanceManager;