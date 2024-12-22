import type { PrintJob, Order } from '../../shared/types';

export class PrinterService {
  async printOrder(order: Order): Promise<boolean> {
    try {
      const printJob: PrintJob = {
        orderId: order.timestamp,
        content: this.formatOrderForPrinting(order),
        timestamp: new Date().toISOString()
      };
      
      await this.sendToPrinter(printJob);
      return true;
    } catch (error) {
      console.error('印刷エラー:', error);
      return false;
    }
  }

  private formatOrderForPrinting(order: Order): string {
    let output = '';
    
    output += '==================\n';
    output += `注文時刻: ${new Date(order.timestamp).toLocaleString('ja-JP')}\n`;
    output += `テーブル: ${order.tableNumber}\n`;
    output += '==================\n\n';
    
    order.items.forEach(item => {
      output += `${item.name} x ${item.quantity}\n`;
      output += `  ¥${item.price.toLocaleString()}\n`;
      output += '\n';
    });
    
    const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    output += '==================\n';
    output += `合計: ¥${total.toLocaleString()}\n`;
    
    return output;
  }

  private async sendToPrinter(job: PrintJob): Promise<void> {
    // TODO: 実際のプリンター制御コードを実装
    console.log('プリンター出力:\n', job.content);
    await new Promise(resolve => setTimeout(resolve, 500)); // 印刷の遅延をシミュレート
  }
} 