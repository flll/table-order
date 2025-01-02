import type { Request, Response } from 'express';
import type { Order } from '../../shared/types';
import { PrinterService } from '../printer/printer.service';

const printerService = new PrinterService();

export class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const orderData = req.body as Order;
      

      if (!orderData.items || orderData.items.length === 0) {
        return res.status(400).json({ message: '注文項目が必要です' });
      }

      const printResult = await printerService.printOrder(orderData);
      if (!printResult) {
        return res.status(500).json({ message: '印刷に失敗しました' });
      }

      res.status(201).json({
        message: '注文を受け付けました',
        orderId: orderData.timestamp
      });
    } catch (error) {
      console.error('注文作成エラー:', error);
      res.status(500).json({ message: '注文の処理中にエラーが発生しました' });
    }
  }

  getOrder(req: Request, res: Response) {
    const { id: _id } = req.params;
    res.json({ message: '注文データ取得API' });
  }

  getActiveOrders(_req: Request, res: Response) {
    res.json({ message: 'アクティブな注文取得API' });
  }
} 