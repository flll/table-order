import React from 'react'
import { MenuList } from './components/Menu/MenuList'
import { CreateOrder } from './components/Order/CreateOrder'
import { OrderList } from './components/Order/OrderList'

export const App = () => {
  return (
    <div>
      <h1>テーブルオーダー</h1>
      
      {/* メニュー一覧 */}
      <section>
        <h2>メニュー</h2>
        <MenuList />
      </section>

      {/* 注文作成 */}
      <section>
        <h2>注文</h2>
        <CreateOrder />
      </section>

      {/* 注文一覧・状況管理 */}
      <section>
        <h2>注文状況</h2>
        <OrderList />
      </section>
    </div>
  )
} 