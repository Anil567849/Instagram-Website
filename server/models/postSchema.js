import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId : {
        type : String,
        require : true,
    },
    keyName : {
        type : String,
        require : true,
        unique : true,
    },
    caption : {
        type : String, 
        default : "No Caption",
    },
    likes : {
        type : Number,
        default : 0,
    },
    likeBy : {
        type : Array,
    },
    comments : {
        type : Number,
        default : 0,
    },
    imageUrl : {
        type : String,
        default : '',
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
});



const Post = mongoose.model('posts', postSchema);
export default Post;