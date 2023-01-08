
import User from '../models/userSchema.js';
import OtpServices from '../services/otpServices.js';
import HashServices from '../services/hashServices.js';
import TokenServices from '../services/tokenServices.js';
import UserServices from '../services/userServices.js';
import validator from 'validator';

class AuthController{

    async signup(req, res){
        
        const {fullName, userName, phoneOrEmail, password} = req.body;
        // console.log(fullName, userName, phoneOrEmail, password);

        if(phoneOrEmail.includes("@")){
            // email id

            //first check phone or email or username exist or not;
            const userNameExist = await User.findOne({username : userName});
            // console.log(result);            
            
            if(userNameExist){
                return res.status(400).json({'message' : 'User Name already exists'});
            }else{

                const emailExist = await User.findOne({email : phoneOrEmail});

                if(emailExist){
                    return res.status(400).json({'message' : 'Email Id already exists'});
                }

                const Hashpassword = HashServices.hashPassword(password);
                const otp = await OtpServices.sendEmailOtp(phoneOrEmail);

                const expiresOtp = Date.now() + 1000*60*20;

                const data = `${phoneOrEmail}.${otp}.${expiresOtp}`; // cerate random data to make hash
        
                let hash = HashServices.hashOtp(data);
                hash += '.' + expiresOtp;

                return res.json({phoneOrEmail, 'hashOtp' : hash, 'password' : Hashpassword});
            }

        }else{
            // phone number
            if(!validator.isNumeric(phoneOrEmail)){
                return res.status(400).json({'message' : 'phone number contain only numeric values'})
            }

            //first check phone or email or username exist or not;
            const userNameExist = await User.findOne({username : userName});
            // console.log(result);
            
            
            if(userNameExist){
                return res.status(400).json({'message' : 'User Name already exists'});
            }else{
                // check is phone number valid
                if(!validator.isMobilePhone(phoneOrEmail,'any') || phoneOrEmail.length !== 10){
                    return res.status(400).json({'message' : 'Phone Number is not valid'});
                }

                
                const Hashpassword = HashServices.hashPassword(password);
                const otp = await OtpServices.sendPhoneOtp(phoneOrEmail);

                const expiresOtp = Date.now() + 1000*60*20;

                const data = `${phoneOrEmail}.${otp}.${expiresOtp}`; // cerate random data to make hash
        
                let hash = HashServices.hashOtp(data);
                hash += '.' + expiresOtp;                
                
                // console.log(hash);
                return res.json({phoneOrEmail, 'hashOtp' : hash, 'password' : Hashpassword});
            }
            
        }
    }


    async verifyOtp(req, res){
        // console.log(req.body);
        const {userData, otpData, userOtp} = req.body;
        const {hashotp, phoneoremail} = otpData;
        const {fullname, username, password} = userData;

        if(!userOtp || !hashotp || !phoneoremail){
            return res.status(400).json({'message' : 'All fields are required'});
        }

        if(userOtp.length !== 6){
            return res.status(400).json({'message' : "otp must be length 6"});
        }

        const [hash, expires] = hashotp.split('.');
        if(Date.now() > +expires){ // (+expires = string convert to int)
            return res.status(400).json({message : "otp expired"});
        }
        
        const hashedData = `${phoneoremail}.${userOtp}.${expires}`;
        // console.log(hashedData);
        const isValid = OtpServices.verifyOtp(hash, hashedData);

        if(!isValid){
            return res.status(400).json({message : "Invalid OTP"});
        }
        
  
        try{
            // create user 
            let user = null;
            if(phoneoremail.includes('@')){
                //email
                console.log('email');
                user = await UserServices.createUser({fullname, username, 'email' : phoneoremail, password});
            }else{
                console.log('phone');
                user = await UserServices.createUser({fullname, username, 'phone' : phoneoremail, password});
            }
            // console.log(user);
            // token 
            const {accessToken, refreshToken} = TokenServices.generateTokens({_id : user._id});
            
            res.cookie('userId', user._id.toString(), {                
                maxAge : 1000*60*60*24*30, // 30 days
            });


            // store into database 
            await TokenServices.storeRefreshToken(refreshToken, user._id);

            res.cookie('refreshToken', refreshToken, {
                maxAge : 1000*60*60*24*30, // 30 days
                httpOnly : true // js (client) won't read the cookie now | only server can read
            });


            // don't store in localstorage it is not safe 
            // so store in cookie using httpOnly
            res.cookie('accessToken', accessToken, {
                maxAge : 1000*60*60*24*30, // 30 days
                httpOnly : true // js (client) won't read the cookie now | only server can read
            });
        
            // res.json({user : u, auth : true});
           
           return res.status(200).json({message : 'fine'});

        }catch(err){
                console.log("ERROR " + err);
                return res.status(500).json({message : 'db error'});
        }

 

    }

    
    async login(req, res){
        const {phoneOrEmail, password} = req.body;
        // console.log(phoneOrEmail, password);
        
        const user = await UserServices.userExist(phoneOrEmail, password);
        if(!user){
            return res.status(400).json({'message' : 'incorrect phone or email and password'})
        }else{

            
            // check valid email id 
            // token 
            const {accessToken} = TokenServices.generateTokens({_id : user._id});

            // get refresh token from database
            const refreshToken = await TokenServices.getRefreshToken(user._id);

            res.cookie('userId', user._id.toString(), {                
                maxAge : 1000*60*60*24*30, // 30 days
            });


            res.cookie('refreshToken', refreshToken, {
                maxAge : 1000*60*60*24*30, // 30 days
                httpOnly : true // js (client) won't read the cookie now | only server can read
            });


            // don't store in localstorage it is not safe 
            // so store in cookie using httpOnly
            res.cookie('accessToken', accessToken, {
                maxAge : 1000*60*60*24*30, // 30 days
                httpOnly : true // js (client) won't read the cookie now | only server can read
            });
        
            // res.json({user : u, auth : true});
            // return res.status(200).json({message : 'fine'});
            return res.status(200).json({'login' : user});
        }

    }
    
}   



export default new AuthController();