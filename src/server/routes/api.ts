import { Router, RequestHandler } from 'express';
import { OrderController } from '../controllers/order.controller';
import { MenuController } from '../controllers/menu.controller';

const router = Router();
const orderController = new OrderController();
const menuController = new MenuController();

router.post('/order', orderController.createOrder as RequestHandler);
router.get('/order/:id', orderController.getOrder as RequestHandler);
router.get('/orders/active', orderController.getActiveOrders as RequestHandler);

router.post('/menu/save', menuController.saveMenu as RequestHandler);
router.get('/menu', menuController.getMenu as RequestHandler);

export default router; 