import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import CartPage from '../../src/views/CartPage.vue'
import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { useOrderStore } from '../../src/stores/order'
import type { MenuItem } from '../../src/stores/order'

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
    const wrapper = mount(CartPage, {
      global: {
        stubs: {
          'ion-page': true,
          'ion-header': true,
          'ion-toolbar': true,
          'ion-title': true,
          'ion-content': true,
          'ion-icon': true
        }
      }
    })
    expect(wrapper.find('.empty-cart').exists()).toBe(true)
    expect(wrapper.find('.empty-cart p').text()).toBe('カートは空です')
  })

  it('カート内の商品が正しく表示される', () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage, {
      global: {
        stubs: {
          'ion-page': true,
          'ion-header': true,
          'ion-toolbar': true,
          'ion-title': true,
          'ion-content': true,
          'ion-list': true,
          'ion-item-sliding': true,
          'ion-item': {
            template: '<div class="ion-item"><slot /></div>'
          },
          'ion-thumbnail': true,
          'ion-label': {
            template: '<div class="ion-label"><slot /></div>'
          },
          'ion-note': {
            template: '<div class="ion-note"><slot /></div>'
          },
          'ion-button': true,
          'ion-icon': true,
          'ion-item-options': true,
          'ion-item-option': true,
          'ion-footer': true
        }
      }
    })

    expect(wrapper.find('.empty-cart').exists()).toBe(false)
    expect(wrapper.find('.ion-label h2').text()).toBe('テスト商品')
    expect(wrapper.find('.ion-label p').text()).toBe('¥1,000')
  })

  it('商品の数量を増減できる', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage, {
      global: {
        stubs: {
          'ion-page': true,
          'ion-header': true,
          'ion-toolbar': true,
          'ion-title': true,
          'ion-content': true,
          'ion-list': true,
          'ion-item-sliding': true,
          'ion-item': {
            template: '<div class="ion-item"><slot /></div>'
          },
          'ion-thumbnail': true,
          'ion-label': true,
          'ion-note': {
            template: '<div class="ion-note"><slot /></div>'
          },
          'ion-button': {
            template: '<button class="ion-button" @click="$emit(\'click\')"><slot /></button>'
          },
          'ion-icon': true,
          'ion-item-options': true,
          'ion-item-option': true,
          'ion-footer': true
        }
      }
    })

    const buttons = wrapper.findAll('.ion-button')
    

    await buttons[1].trigger('click')
    expect(store.cartItems[0].quantity).toBe(2)


    await buttons[0].trigger('click')
    expect(store.cartItems[0].quantity).toBe(1)
  })

  it('商品を削除できる', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage, {
      global: {
        stubs: {
          'ion-page': true,
          'ion-header': true,
          'ion-toolbar': true,
          'ion-title': true,
          'ion-content': true,
          'ion-list': true,
          'ion-item-sliding': true,
          'ion-item': true,
          'ion-thumbnail': true,
          'ion-label': true,
          'ion-note': true,
          'ion-button': true,
          'ion-icon': true,
          'ion-item-options': true,
          'ion-item-option': {
            template: '<button class="ion-item-option" @click="$emit(\'click\')"><slot /></button>'
          },
          'ion-footer': true
        }
      }
    })

    const deleteButton = wrapper.find('.ion-item-option')
    await deleteButton.trigger('click')
    expect(store.cartItems).toHaveLength(0)
  })

  it('合計金額が正しく計算される', () => {
    const store = useOrderStore()
    store.addToCart(mockItem)
    store.updateQuantity(mockItem.id, 3)

    const wrapper = mount(CartPage, {
      global: {
        stubs: {
          'ion-page': true,
          'ion-header': true,
          'ion-toolbar': true,
          'ion-title': true,
          'ion-content': true,
          'ion-list': true,
          'ion-item-sliding': true,
          'ion-item': {
            template: '<div class="ion-item"><slot /></div>'
          },
          'ion-thumbnail': true,
          'ion-label': {
            template: '<div class="ion-label"><slot /></div>'
          },
          'ion-note': {
            template: '<div class="ion-note"><slot /></div>'
          },
          'ion-button': true,
          'ion-icon': true,
          'ion-item-options': true,
          'ion-item-option': true,
          'ion-footer': true
        }
      }
    })

    const total = wrapper.find('.ion-note h2')
    expect(total.text()).toBe('¥3,000')
  })

  it('注文を確定できる', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage, {
      global: {
        stubs: {
          'ion-page': true,
          'ion-header': true,
          'ion-toolbar': true,
          'ion-title': true,
          'ion-content': true,
          'ion-list': true,
          'ion-item-sliding': true,
          'ion-item': true,
          'ion-thumbnail': true,
          'ion-label': true,
          'ion-note': true,
          'ion-button': {
            template: '<button class="ion-button" @click="$emit(\'click\')" :disabled="$attrs.disabled"><slot /></button>'
          },
          'ion-icon': true,
          'ion-item-options': true,
          'ion-item-option': true,
          'ion-footer': true
        }
      }
    })

    const submitButton = wrapper.find('.ion-button')
    await submitButton.trigger('click')
    expect(store.cartItems).toHaveLength(0)
  })

  it('注文確定中はボタンが無効化される', async () => {
    const store = useOrderStore()
    store.addToCart(mockItem)

    const wrapper = mount(CartPage, {
      global: {
        stubs: {
          'ion-page': true,
          'ion-header': true,
          'ion-toolbar': true,
          'ion-title': true,
          'ion-content': true,
          'ion-list': true,
          'ion-item-sliding': true,
          'ion-item': true,
          'ion-thumbnail': true,
          'ion-label': true,
          'ion-note': true,
          'ion-button': {
            template: '<button class="ion-button" @click="$emit(\'click\')" :disabled="$attrs.disabled"><slot /></button>'
          },
          'ion-icon': true,
          'ion-item-options': true,
          'ion-item-option': true,
          'ion-footer': true
        }
      }
    })

    const submitButton = wrapper.find('.ion-button')
    await submitButton.trigger('click')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })
}) 