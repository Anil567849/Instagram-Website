

import DbController from './DbController.js';


class QueryController{

    async findMyFriends(req, res){
        const {query, myId} = req.body;
        const result = await DbController.findMyFriends(query, myId);
        if(result){
            return res.status(200).json({result});
        }else{
            return res.status(400).json({result : null});
        }
    }

    async follow(req, res){
        const {id, myId} = req.body;
        // console.log(id, myId);

        const result = await DbController.follow(id, myId);
        if(result){
            res.status(200).json({result});
        }else{
            res.status(400).json({result : null});
        }
    }

}

export default new QueryController();