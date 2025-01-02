import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import apiRoutes from './routes/api';
import path from 'path';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../../../dist')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../../dist/index.html'));
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'サーバーエラーが発生しました',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`サーバーが起動しました - ポート ${PORT}`);
  console.log(`環境: ${process.env.NODE_ENV || 'development'}`);
}); 