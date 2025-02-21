import User from "../user/User.js"

const Test = () => {
    const test = new User("marco", "toma", "25");

    return <div className="prova">
        {test.description()}
    </div>
}

export default Test;