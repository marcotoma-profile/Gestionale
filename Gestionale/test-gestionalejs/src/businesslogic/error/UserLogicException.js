import LogicManager from "../LogicManager";

class UserLogicException {

    constructor(type, message) {
        LogicManager.getInstance().getExceptionManager().addMessage(type, message);
    }
}

export default UserLogicException;