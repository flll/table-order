import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import MenuPage from '../../src/views/MenuPage.vue'
import { IonicVue } from '@ionic/vue'
import { createApp } from 'vue'
import { useOrderStore } from '../../src/stores/order'

describe('MenuPage', () => {
  beforeEach(() => {
    const app = createApp({})
    app.use(IonicVue)
    setActivePinia(createPinia())
  })

  const mountOptions = {
    global: {
      stubs: {
        'ion-page': {
          template: '<div class="ion-page"><slot /></div>'
        },
        'ion-header': {
          template: '<header class="ion-header"><slot /></header>'
        },
        'ion-toolbar': {
          template: '<div class="ion-toolbar"><slot /></div>'
        },
        'ion-title': {
          template: '<div class="ion-title"><slot /></div>'
        },
        'ion-content': {
          template: '<main class="ion-content"><slot /></main>'
        },
        'ion-grid': {
          template: '<div class="ion-grid"><slot /></div>'
        },
        'ion-row': {
          template: '<div class="ion-row"><slot /></div>'
        },
        'ion-col': {
          template: '<div class="ion-col" :size="$attrs.size" :size-md="$attrs[\'size-md\']"><slot /></div>'
        },
        'ion-card': {
          template: '<div class="ion-card"><slot /></div>'
        },
        'ion-card-header': {
          template: '<div class="ion-card-header"><slot /></div>'
        },
        'ion-card-title': {
          template: '<h2 class="ion-card-title"><slot /></h2>'
        },
        'ion-list': {
          template: '<div class="ion-list"><slot /></div>'
        },
        'ion-item': {
          template: '<div class="ion-item"><div class="start-slot"><slot name="start" /></div><slot /><div class="end-slot"><slot name="end" /></div></div>'
        },
        'ion-thumbnail': {
          template: '<div class="ion-thumbnail"><slot /></div>'
        },
        'ion-label': {
          template: '<div class="ion-label"><slot /></div>'
        },
        'ion-button': {
          template: '<button type="button" class="ion-button" @click="$emit(\'click\')"><slot /></button>'
        },
        'ion-icon': {
          template: '<span class="ion-icon"><slot /></span>'
        }
      }
    }
  }

  it('メニューカテゴリーとアイテムが正しく表示される', async () => {
    const wrapper = mount(MenuPage, mountOptions)
    await wrapper.vm.$nextTick()
    

    const categories = wrapper.findAll('h2.ion-card-title')
    expect(categories).toHaveLength(2)
    expect(categories[0].text()).toBe('定食')
    expect(categories[1].text()).toBe('麺類')


    const items = wrapper.findAll('.ion-item')
    expect(items).toHaveLength(4)
    const itemNames = items.map(item => item.find('.ion-label h2').text())
    expect(itemNames).toEqual(['唐揚げ定食', '刺身定食', 'うどん', 'ラーメン'])
  })

  it('商品をカートに追加できる', async () => {
    const wrapper = mount(MenuPage, mountOptions)
    await wrapper.vm.$nextTick()
    

    const addButtons = wrapper.findAll('button.ion-button')
    expect(addButtons).toHaveLength(4)
    await addButtons[0].trigger('click')


    const store = useOrderStore()
    expect(store.cartItems).toHaveLength(1)
    expect(store.cartItems[0].name).toBe('唐揚げ定食')
    expect(store.cartItems[0].quantity).toBe(1)
  })

  it('商品の価格が正しくフォーマットされて表示される', async () => {
    const wrapper = mount(MenuPage, mountOptions)
    await wrapper.vm.$nextTick()
    
    const items = wrapper.findAll('.ion-item')
    expect(items).toHaveLength(4)
    const prices = items.map(item => item.find('.ion-label h3').text())
    expect(prices).toEqual(['¥850', '¥1,200', '¥700', '¥800'])
  })

  it('商品の画像が正しく表示される', async () => {
    const wrapper = mount(MenuPage, mountOptions)
    await wrapper.vm.$nextTick()
    
    const images = wrapper.findAll('img')
    expect(images).toHaveLength(4)
    expect(images[0].attributes('src')).toBe('/images/karaage.jpg')
    expect(images[1].attributes('src')).toBe('/images/sashimi.jpg')
    expect(images[2].attributes('src')).toBe('/images/udon.jpg')
    expect(images[3].attributes('src')).toBe('/images/ramen.jpg')
  })
}) 