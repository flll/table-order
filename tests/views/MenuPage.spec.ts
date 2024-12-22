import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MenuPage from '../src/views/MenuPage.vue'
import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { useOrderStore } from '../src/stores/order'

describe('MenuPage', () => {
  beforeEach(() => {
    const app = createApp({})
    app.use(IonicVue)
    setActivePinia(createPinia())
  })

  it('メニューカテゴリーとアイテムが正しく表示される', () => {
    const wrapper = mount(MenuPage)
    
    // カテゴリーの確認
    const categories = wrapper.findAll('ion-card-title')
    expect(categories[0].text()).toBe('定食')
    expect(categories[1].text()).toBe('麺類')

    // アイテムの確認
    const items = wrapper.findAll('ion-item')
    expect(items[0].find('h2').text()).toBe('唐揚げ定食')
    expect(items[1].find('h2').text()).toBe('刺身定食')
    expect(items[2].find('h2').text()).toBe('うどん')
    expect(items[3].find('h2').text()).toBe('ラーメン')
  })

  it('商品をカートに追加できる', async () => {
    const wrapper = mount(MenuPage)
    
    // 最初の商品の追加ボタンをクリック
    const addButton = wrapper.findAll('ion-button')[0]
    await addButton.trigger('click')

    // ストアの状態を確認
    const store = useOrderStore()
    expect(store.cartItems).toHaveLength(1)
    expect(store.cartItems[0].name).toBe('唐揚げ定食')
    expect(store.cartItems[0].quantity).toBe(1)
  })

  it('商品の価格が正しくフォーマットされて表示される', () => {
    const wrapper = mount(MenuPage)
    
    const prices = wrapper.findAll('h3')
    expect(prices[0].text()).toBe('¥850')
    expect(prices[1].text()).toBe('¥1,200')
    expect(prices[2].text()).toBe('¥700')
    expect(prices[3].text()).toBe('¥800')
  })

  it('商品の画像が正しく表示される', () => {
    const wrapper = mount(MenuPage)
    
    const images = wrapper.findAll('ion-thumbnail img')
    expect(images[0].attributes('src')).toBe('/images/karaage.jpg')
    expect(images[1].attributes('src')).toBe('/images/sashimi.jpg')
    expect(images[2].attributes('src')).toBe('/images/udon.jpg')
    expect(images[3].attributes('src')).toBe('/images/ramen.jpg')
  })
}) 