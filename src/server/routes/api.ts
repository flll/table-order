import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const orderController = new OrderController();

// 注文関連のエンドポイント
router.post('/order', orderController.createOrder.bind(orderController));
router.get('/order/:id', orderController.getOrder.bind(orderController));
router.get('/orders/active', orderController.getActiveOrders.bind(orderController));

export default router; 