import express from 'express';
import { protect,admin } from '../middleware/authMiddleware.js';

import { 
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,} from '../controllers/userController.js';

const router = express.Router(); 

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)

router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)


export default router
