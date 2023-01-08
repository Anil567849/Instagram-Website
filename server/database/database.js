import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({path : './config.env'});


mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URL, (err) =>{
    if(err) console.log('db failed');
    else console.log('db success');
})

