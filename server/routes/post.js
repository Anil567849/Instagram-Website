import express from 'express';
const router = express.Router();
import PostController from '../controllers/postController.js';
import multer from 'multer';

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });




router.post('/postFile', upload.single('postFile'), PostController.postFile);
router.get('/getAllPosts', PostController.getAllPosts);
router.post('/increaseLike', PostController.increaseLike);
router.post('/fetchAllMyPosts', PostController.fetchAllMyPosts);



export default router;