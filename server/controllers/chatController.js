

import DbController from './DbController.js';
import {io} from '../app.js';


class ChatController{

    async fecthAllFollowers(req, res){
        const {myId} = req.body;
        const result = await DbController.fecthAllFollowers(myId);
        // console.log(result);

        return res.status(200).json({result});
    }
    
    async fetchAllMessages(req, res){
        const {receiver_id, myId} = req.body;
        const result = await DbController.fetchAllMessages(myId, receiver_id);
        // console.log(result);

        return res.status(200).json({result});
    }
    
    async saveMsg(req, res){
        const {receiverId, myId, msg} = req.body;
        const result = await DbController.saveMsg(myId, receiverId, msg);
        // console.log(result);

        if(result){            
            const date = new Date();
            io.emit('message', {myId, receiverId, msg, time : date});
        }

        return res.status(200).json({result});
    }    

}

export default new ChatController();