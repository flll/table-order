import express from 'express'
import { menuController } from '../controllers/menuController'

const router = express.Router()

// メニュー一覧の取得
router.get('/', menuController.getMenuItems)

// メニューの追加
router.post('/', menuController.createMenuItem)

// メニューの更新
router.put('/:id', menuController.updateMenuItem)

// メニューの削除
router.delete('/:id', menuController.deleteMenuItem)

export default router 