import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CartPage from '../src/views/CartPage.vue'
import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { useOrderStore } from '../src/stores/order'
import type { MenuItem } from '../src/stores/order'

describe('CartPage', () => {
  beforeEach(() => {
    const app = createApp({})
    app.use(IonicVue)
    setActivePinia(createPinia())
  })

  const mockItem: MenuItem = {
    id: 1,
    name: 'テスト商品',
    description: 'テスト説明',
    price: 1000,
    image: 'test.jpg'
  }

  it('空のカート時に適切なメッセージが表示される', () => {
    const wrapper = mount(CartPage)
    expect(wrapper.find('.empty-cart').exists()).toBe(true)
    expect(wrapper.find('.empty-cart p').text()).toBe('カートは空です')
  })

  it('カート内の商品が正しく表示される', () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage)
    expect(wrapper.find('.empty-cart').exists()).toBe(false)
    expect(wrapper.find('ion-item h2').text()).toBe('テスト商品')
    expect(wrapper.find('ion-item p').text()).toBe('¥1,000')
  })

  it('商品の数量を増減できる', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage)
    const buttons = wrapper.findAll('ion-button')
    
    // 増加ボタン
    await buttons[1].trigger('click')
    expect(store.cartItems[0].quantity).toBe(2)

    // 減少ボタン
    await buttons[0].trigger('click')
    expect(store.cartItems[0].quantity).toBe(1)
  })

  it('商品を削除できる', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage)
    const deleteButton = wrapper.find('ion-item-option')
    await deleteButton.trigger('click')

    expect(store.cartItems).toHaveLength(0)
  })

  it('合計金額が正しく計算される', () => {
    const store = useOrderStore()
    store.addToCart(mockItem)
    store.updateQuantity(mockItem.id, 3)

    const wrapper = mount(CartPage)
    const total = wrapper.findAll('ion-item h2')[1]
    expect(total.text()).toBe('¥3,000')
  })

  it('注文を確定できる', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    // ルーターのモック
    const mockRouter = {
      push: vi.fn()
    }
    vi.mock('vue-router', () => ({
      useRouter: () => mockRouter
    }))

    const wrapper = mount(CartPage)
    const submitButton = wrapper.find('ion-button[expand="block"]')
    await submitButton.trigger('click')

    expect(store.cartItems).toHaveLength(0)
    expect(mockRouter.push).toHaveBeenCalledWith('/tabs/orders')
  })

  it('注文確定中はボタンが無効化される', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage)
    const submitButton = wrapper.find('ion-button[expand="block"]')
    
    await submitButton.trigger('click')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })
}) 