import express from 'express';
const router = express.Router();
import QueryController from '../controllers/queryController.js';


router.post('/findMyFriends', QueryController.findMyFriends);
router.post('/follow', QueryController.follow);



export default router;