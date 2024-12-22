import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import apiRoutes from './routes/api';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// ESモジュールでの__dirnameの代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, '../../dist/client')));

// APIルートの設定
app.use('/api', apiRoutes);

// その他のリクエストはクライアントアプリにルーティング
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
});

// エラーハンドリング
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'サーバーエラーが発生しました',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました - ポート ${PORT}`);
  console.log(`環境: ${process.env.NODE_ENV || 'development'}`);
}); 