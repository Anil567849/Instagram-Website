import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
    },
    chat : [
        {
            msg : {type : String},
            sender : {type : Boolean, default : false},
            time: { type: Date, default: Date.now() }
        }
    ]
});



const Chat = mongoose.model('chat', chatSchema);
export default Chat;