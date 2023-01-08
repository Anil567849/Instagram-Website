import crypto from 'crypto';
import HashService from './hashServices.js';

class OtpServices{

    async sendEmailOtp(){
        const val = crypto.randomInt(100000, 999999);
        console.log('otp', val);
        return val;
    }
    async sendPhoneOtp(){
        const val = crypto.randomInt(100000, 999999);
        console.log('otp', val);
        return val;
    }

    verifyOtp(hashedOtp, data){
        let computedHash = HashService.hashOtp(data);

        return (computedHash === hashedOtp);
    }

}

export default new OtpServices();