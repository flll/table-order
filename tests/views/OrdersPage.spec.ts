import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import OrdersPage from '../../views/OrdersPage.vue'
import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { useOrderStore } from '../src/stores/order'
import type { Order } from '../src/stores/order'

describe('OrdersPage', () => {
  beforeEach(() => {
    const app = createApp({})
    app.use(IonicVue)
    setActivePinia(createPinia())
  })

  const mockOrder: Order = {
    items: [
      {
        id: 1,
        name: 'テスト商品',
        description: 'テスト説明',
        price: 1000,
        image: 'test.jpg',
        quantity: 2
      }
    ],
    tableNumber: '1',
    timestamp: '2024-03-01T12:00:00Z',
    status: 'pending'
  }

  it('注文がない場合に適切なメッセージが表示される', () => {
    const wrapper = mount(OrdersPage)
    expect(wrapper.find('.no-orders').exists()).toBe(true)
    expect(wrapper.find('.no-orders p').text()).toBe('注文履歴がありません')
  })

  it('注文履歴が正しく表示される', async () => {
    const store = useOrderStore()
    store.activeOrders = [mockOrder]

    const wrapper = mount(OrdersPage)
    expect(wrapper.find('.no-orders').exists()).toBe(false)
    
    // 注文情報の確認
    expect(wrapper.find('ion-item-divider h2').text()).toContain('2024/3/1')
    expect(wrapper.find('ion-item-divider p').text()).toBe('テーブル 1')
    
    // 商品情報の確認
    const item = wrapper.find('ion-item')
    expect(item.find('h3').text()).toBe('テスト商品')
    expect(item.find('ion-note').text()).toBe('2個')
  })

  it('注文ステータスが正しく表示される', () => {
    const store = useOrderStore()
    store.activeOrders = [mockOrder]

    const wrapper = mount(OrdersPage)
    const chip = wrapper.find('ion-chip')
    expect(chip.text()).toBe('受付中')
    expect(chip.attributes('color')).toBe('warning')
  })

  it('合計金額が正しく計算される', () => {
    const store = useOrderStore()
    store.activeOrders = [mockOrder]

    const wrapper = mount(OrdersPage)
    const total = wrapper.find('ion-item[lines="none"] ion-note')
    expect(total.text()).toBe('¥2,000')
  })

  it('注文を更新できる', async () => {
    const store = useOrderStore()
    const fetchActiveOrders = vi.spyOn(store, 'fetchActiveOrders')

    const wrapper = mount(OrdersPage)
    const refreshButton = wrapper.find('ion-button')
    await refreshButton.trigger('click')

    expect(fetchActiveOrders).toHaveBeenCalled()
  })

  it('プルトゥリフレッシュが機能する', async () => {
    const store = useOrderStore()
    const fetchActiveOrders = vi.spyOn(store, 'fetchActiveOrders')

    const wrapper = mount(OrdersPage)
    const refresher = wrapper.find('ion-refresher')
    await refresher.trigger('ionRefresh')

    expect(fetchActiveOrders).toHaveBeenCalled()
  })

  it('日付が正しくフォーマットされる', () => {
    const store = useOrderStore()
    store.activeOrders = [mockOrder]

    const wrapper = mount(OrdersPage)
    const date = wrapper.find('ion-item-divider h2')
    expect(date.text()).toMatch(/\d{4}\/\d{1,2}\/\d{1,2} \d{2}:\d{2}/)
  })
}) 