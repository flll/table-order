import { Router, RequestHandler } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const orderController = new OrderController();

// 注文関連のエンドポイント
router.post('/order', orderController.createOrder as RequestHandler);
router.get('/order/:id', orderController.getOrder as RequestHandler);
router.get('/orders/active', orderController.getActiveOrders as RequestHandler);

export default router; 