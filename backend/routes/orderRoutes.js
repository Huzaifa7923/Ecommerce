import express from 'express'
const router=express.Router();

import{
addOrderItem,
getMyOrder,
getOrderById,
getOrders,
updateOrderToDelivered,
updateOrderToPaid
} from '../controllers/orderController.js'

import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(protect,addOrderItem).get(protect,admin,getOrders);
router.route('/myorders').get(protect,getMyOrder);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);

export default router;