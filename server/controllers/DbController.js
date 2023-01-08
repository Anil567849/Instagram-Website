
import Post from '../models/postSchema.js';
import User from '../models/userSchema.js';
import Chat from '../models/chatSchema.js';
import mongoose from 'mongoose';

class DbController{

    async insertPost(keyName, userId){
        try {
            const data = new Post({
                userId,
                keyName
            })
            const result = await data.save();
            return {result};           
        } catch (error) {
            console.log(error);
            return {result : null};
        }
    }


    async getAllPosts(){

        try {
            const result = await Post.find({}).sort({createdAt : -1});
            if(result){
                return result;
            }
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    async increaseLike(imageId, userId){
        // console.log('db ', id);
        try {

            const found = await Post.findOne({_id : imageId}).where('likeBy').in(userId);
            // console.log(found);

            if(found){ // dislike
                await Post.updateOne({_id : imageId}, {$inc : {likes : -1}}).exec();
                await Post.updateOne({_id : imageId},  {$pull : {likeBy : userId}});
                return {result : 'dec'};
            }else{ // like
                await Post.updateOne({_id : imageId}, {$inc : {likes : 1}});
                await Post.updateOne({_id : imageId},  {$push : {likeBy : userId}});
                return {result : 'inc'};
            }
        } catch (error) {
            console.log(error);
            return ({result : null});
        }
    } 


    async fetchAllMyPosts(userId){
        try {
            const posts = await Post.find({userId}).exec();
            const data = await User.findOne({_id : userId}).select({followers : 1, following : 1});
            return {posts, data};
        } catch (error) {
            console.log(error);
            return ({result : null});
        }
    }


    async addUrl(key, url){
        try {
            await Post.updateOne({keyName : key}, {$set : {imageUrl : url}});
        } catch (error) {
            console.log(error);
        }
    }

    async findMyFriends(query, myId){
        try {
            // const result = await User.find({$text: { $search: query }}); // full-text-search
            const result = await User.find({ username: { $regex: `.*${query}.*` } }, '-password').where('_id').ne(myId).limit(5); // partial match bhi chlega
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    async follow(id, myId){
        try {
            await User.updateOne({_id : id}, {$push : {followers : {'userId' : myId}}});
            await User.updateOne({_id : myId}, {$push : {following : {'userId' : id}}});
            // console.log(result);
            return {result : 'done'};
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async fecthAllFollowers(myId){
        // console.log(myId);
        try {
            const result = await User.findOne({_id : myId}).select('following');
            
            let data = [];
            for(let user of result.following){
                const ans = await User.findOne({_id : user.userId}).populate().select({username : 1, _id : 1});
                // console.log('me', ans);
                data.push(ans);
            }

            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async fetchAllMessages(myId, receiver_id){
        try {
            const result = await Chat.findOne({senderId : myId, receiverId : receiver_id}).select({chat : 1});
            // console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async saveMsg(myId, receiverId, msg){

        try {
            const findSenderReceiver = await Chat.findOne({senderId : myId, receiverId});
            if(findSenderReceiver){
                const res = await Chat.updateOne({senderId : myId, receiverId}, {$push : {chat : {msg, sender : true}}});
            }else{
                const newChat = new Chat({
                    senderId : myId, 
                    receiverId,
                });

                const saved = await newChat.save();
                if(saved){                    
                    await Chat.updateOne({senderId : myId, receiverId}, {$push : {chat : {msg, sender : true}}})
                }
            }

            const findReceiverSender = await Chat.findOne({senderId : receiverId, receiverId : myId});
            if(findReceiverSender){
                await Chat.updateOne({senderId : receiverId, receiverId : myId}, {$push : {chat : {msg}}})
            }else{
                const newChat = new Chat({
                    senderId : receiverId,
                    receiverId : myId,
                });

                const saved = await newChat.save();
                if(saved){                    
                    await Chat.updateOne({senderId : receiverId, receiverId : myId}, {$push : {chat : {msg}}})
                }
            }
            return true;

        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
}

export default new DbController();