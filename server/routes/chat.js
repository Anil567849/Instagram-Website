import express from 'express';
const router = express.Router();
import ChatController from '../controllers/chatController.js';


router.post('/fecthAllFollowers', ChatController.fecthAllFollowers);
router.post('/fetchAllMessages', ChatController.fetchAllMessages);
router.post('/saveMsg', ChatController.saveMsg);



export default router;