import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true,
    },
    phone : {
        type : Number,
        unique : false,
        default : null,
        // validate(value){
        //     if(validator.isMobilePhone(value.toString(), 'any')){
        //         throw new Error("Phone Number is inValid");
        //     }
        // }
    },
    email : {
        type : String,
        unique : false,
        default : null,
        // validate(value){
        //     if(validator.isEmail(value.toString())){
        //         throw new Error("Email is inValid");
        //     }
        // }
    },
    password : {
        type : String,
    },
    followers : [
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users'
            }
        }
    ],
    following : [
        {
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'users'
            }
        }
    ],
    join : {
        type : Date,
        default : Date.now,
    }
});

userSchema.index({ username: 'text'});

const User = mongoose.model('users', userSchema);
export default User;