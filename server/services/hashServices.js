
import crypto from 'crypto';


class HashService{

    hashOtp(data){
        const temp = crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex');
        // console.log('hash services', temp);
        return temp;
    }

    hashPassword(data){
        const temp = crypto.createHmac('sha256', process.env.HASH_SECRET).update(data).digest('hex');
        // console.log('hash services', temp);
        return temp;
    }

    generateKeyName(){
        const temp = crypto.randomBytes(32).toString('hex');
        return temp;
    }

}

export default new HashService();