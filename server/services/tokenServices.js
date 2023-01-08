
import jwt from 'jsonwebtoken';
import RefreshTokens from '../models/refreshTokenSchema.js';


class TokenServices{

    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            // one minute 
            expiresIn : '1Y'
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            // one year 
            expiresIn : '1y'
        });
        return {accessToken, refreshToken};
    }

    async storeRefreshToken(token, userId){
        try{
            await RefreshTokens.create({token, userId});
        }catch(err){
            res.status(400).json({err});
            console.log('Error auth controller ', err);
        }
    }

    async getRefreshToken(userId){
        try{
            const data = await RefreshTokens.findOne({userId});
            // console.log(data);
            if(!data){
                return null;
            }
            return data.token;
        }catch(err){
            console.log('Error auth controller ', err);
            res.status(400).json({err});
        }
    }

}

export default new TokenServices();