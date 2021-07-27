const apiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const User  = require('../db/models/user.model');


class UserController{
    async registration(req, res, next){
        if (req.method === 'POST'){

            let login, mail, password;
            try{
                login = req.body.login;
                mail = req.body.mail;
                password = req.body.password;
            }catch (_){
                return next(apiError.badRequest('Что-то пошло не так, повторите запрос'));
            }

            if (login && mail && password){
                let newUser = new User({
                    'login': login,
                    'mail': mail,
                    'password': password
                });
                await User.addUser(newUser, (err) =>{
                    if (err) {
                        if (err.name === 'MongoError' && err.code === 11000) {
                            // Duplicate mail
                            return next(apiError.unprocessableEntity('Такой пользователь уже существует'));
                        }
                        // Some other error
                        return next(apiError.unprocessableEntity('Ошибка при сохранении пользователя'));
                    }
                    res.status(200).json('Регистрация прошла успешно');
                });
            }else{
                return next(apiError.badRequest('Логин, пароль или mail не заданы, повторите запрос'));
            }
        }
    }


    async login(req, res, next){
        if (req.method === 'POST'){
            let mail, password;

            try{
                 mail = req.body.mail;
                 password = req.body.password;
            }catch (_){
                return next(apiError.badRequest('Что-то пошло не так, повторите запрос'));
            }

            if (mail && password) {
                User.getUserByCredentials(mail, (err, user) => {
                    if (err){
                        return next(apiError.internalServerError('Неизвестная ошибка'));
                    }
                    if(user){
                        bcrypt.compare(password, user.password, (err, result)=>{
                            if(err){
                                return next(apiError.internalServerError('Неизвестная ошибка'));
                            };

                            if(result){
                                User.createUserSession(user, req.clientIp, (err)=>{
                                    if(err){
                                        return next(apiError.unprocessableEntity('Ошибка при сохранении сессии'));
                                    }
                                    res.sendStatus(200);
                                })
                            }else{
                                return next(apiError.notFound('Такой пользователь не существует'));
                            }
                        });
                    }else{
                        return next(apiError.notFound('Такой пользователь не существует'));
                    }
                });

            } else {
                return next(apiError.badRequest('Пароль или mail не заданы, повторите запрос'));
            }
        }else{
            return next(apiError.badRequest('Неверный метод запроса'));
        }

    }

    async logout(req, res, next){
        try{

        }catch (e){

        }
    }

    async refresh(req, res, next){
        try{

        }catch (e){

        }
    }

    async check(req, res, next){
        const {id} = req.query;
        if(!id) {
            return next(apiError.badRequest('Не задан ID'));
        }
    }
}

module.exports = new UserController();