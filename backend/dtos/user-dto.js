//Data Transfer Object

module.exports = class UserDto{
    login;
    mail;
    id;

    constructor(model) {
        this.login = model.login;
        this.mail = model.mail;
        this.id = model._id;
    }
}