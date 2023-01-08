import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RefreshSchema = new Schema({
    token : {type : String, required : true},
    userId : {type : Schema.Types.ObjectId, ref : "User"},
},{
    timestamps : true
});

const RefreshToken = mongoose.model("refresh_tokens", RefreshSchema);
export default RefreshToken;