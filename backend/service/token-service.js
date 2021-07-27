const jwt = require('jsonwebtoken');
const tokenModel = require('../db/models/token.model');
const User = require('../db/models/user.model');

const jwtAccessKey = 'PQsrR*UKLZB-pLKnMJhTzfkqiaw8sPycbKgd_K*DzPZJNReaq-aWiC@RrxYXDWY9RVCDi!nEppuEw7xMKMEA@ioZA4QpjbRmc6q7';
const jwtRefreshKey = '8mg.CEApUKwiLpE_ZEEyyJ6D9nzNrHeP-sLr7nWhsZBkDuFFTsdRe6wug@c.Co47j-uuzL4.FrYrYYGcR7b_2g4n6gx7yQBZxgmY';

class TokenService{
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, jwtAccessKey, {expiresIn: '1h'});
        const refreshToken = jwt.sign(payload, jwtRefreshKey, {expiresIn: '30d'});
        return{
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId});

        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken});
        return token;
    }
}

module.exports = new TokenService();