
import User from '../models/userSchema.js';
import HashServices from './hashServices.js';
import validator from 'validator';

class UserServices{

    async createUser(data){
        return await User.create(data);
    }

    
    async userExist(phoneOrEmail, password){
        try {            
            let user = null;
            if(phoneOrEmail.includes('@')){
                user = await User.findOne({'email' : phoneOrEmail});
            }else{
                    
                // phone number
                if(!validator.isNumeric(phoneOrEmail)){
                    return null;
                }
                user = await User.findOne({'phone' : phoneOrEmail});
            }
            if(!user){
                return user;
            }
            const hash = HashServices.hashPassword(password);
            if(hash === user.password){
                return user;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}


export default new UserServices();