import type { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const MENU_FILE_PATH = path.join(__dirname, '../../data/menu.json');

export class MenuController {
  async saveMenu(req: Request, res: Response) {
    try {
      const menuData = req.body;
      await fs.writeFile(MENU_FILE_PATH, JSON.stringify(menuData, null, 2), 'utf-8');
      res.json({ message: 'メニューを保存しました' });
    } catch (error) {
      console.error('メニュー保存エラー:', error);
      res.status(500).json({ message: 'メニューの保存に失敗しました' });
    }
  }

  async getMenu(_req: Request, res: Response) {
    try {
      const menuData = await fs.readFile(MENU_FILE_PATH, 'utf-8');
      res.json(JSON.parse(menuData));
    } catch (error) {
      console.error('メニュー取得エラー:', error);
      res.status(500).json({ message: 'メニューの取得に失敗しました' });
    }
  }
} 