
import * as dotenv from 'dotenv';
dotenv.config({path : './config.env'});
import { S3Client, PutObjectCommand, GetObjectCommand   } from "@aws-sdk/client-s3";
import HashServices from '../services/hashServices.js';
import sharp from 'sharp';
import DbController from './DbController.js';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY,
        secretAccessKey : process.env.AWS_SECRET_KEY,
    },
     region: process.env.AWS_BUCKET_REGION,
});



class PostController{

    async postFile(req, res){
        console.log('body', req.file);
        // console.log('body', req.body);
        const {userId} = req.body;

        if(req.file.mimetype === 'video/mp4'){

            const name = HashServices.generateKeyName() + "_" + req.file.originalname;
            const params = {
                Bucket : process.env.AWS_BUCKET_NAME,
                Key : name,
                Body : req.file.buffer,
                ContentType : req.file.mimetype,
            }
            const command = new PutObjectCommand(params);
            try {
                await s3.send(command);
                
                //insert data in database            
                const {result} = await DbController.insertPost(name, userId);
                // console.log('result' , result);
                if(result){
                    return res.status(200).json({'result': result});
                }else{
                    return res.status(400).json({'result': 'someting went wrong while saving into database'});
                }
    
            } catch (error) {
                return res.status(200).json({'result': error});            
            }

        }else{

            const name = HashServices.generateKeyName() + "_" + req.file.originalname;
            // const buffer = await sharp(req.file.buffer).resize({height : 1920, width : 1080, fit : "contain"}).toBuffer();
            const buffer = await sharp(req.file.buffer).resize({fit : "contain"}).toBuffer();
            const params = {
                Bucket : process.env.AWS_BUCKET_NAME,
                Key : name,
                Body : buffer,
                ContentType : req.file.mimetype,
            }
            const command = new PutObjectCommand(params);
            try {
                await s3.send(command);
                
                //insert data in database            
                const {result} = await DbController.insertPost(name, userId);
                // console.log('result' , result);
                if(result){
                    return res.status(200).json({'result': result});
                }else{
                    return res.status(400).json({'result': 'someting went wrong while saving into database'});
                }
    
            } catch (error) {
                return res.status(200).json({'result': error});            
            }

        }
 
    
    }

    async getAllPosts(req, res){
        try {
            const result = await DbController.getAllPosts();

            // attach presigner url 
            // console.log(result);
            for(const post of result){

                const params = {
                    Bucket : process.env.AWS_BUCKET_NAME,
                    Key : post.keyName,
                }
                const command = new GetObjectCommand(params);
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                post.imageUrl = url;
                await DbController.addUrl(post.keyName, url);
            }   
            
            if(result){
                return res.status(200).json({result})
            }else{
                return res.status(400).json({result : 'something went wrong in db'});
            }
            
        } catch (error) {
            return res.status(400).json({result : error});
        }

    }

    async increaseLike(req, res){
        const {imageId, userId} = req.body;
        // console.log(imageId);

        try {
            const {result} = await DbController.increaseLike(imageId, userId);
            if(result){
                return res.status(200).json(result)
            }
            
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    async fetchAllMyPosts(req, res){
        const {userId} = req.body;
        
        const result = await DbController.fetchAllMyPosts(userId);
        res.status(200).json({result});
    }
}

export default new PostController();