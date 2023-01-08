import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authController.js';



router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.post('/verifyOtp', AuthController.verifyOtp);



export default router;