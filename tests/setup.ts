import { config } from '@vue/test-utils'
import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'
import { vi } from 'vitest'

// Vue Routerのモック
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

// Ionicコンポーネントのスタブ
const ionicStubs = [
  'IonPage', 'IonContent', 'IonHeader', 'IonToolbar', 'IonTitle', 
  'IonList', 'IonItem', 'IonLabel', 'IonButton', 'IonIcon', 'IonThumbnail',
  'IonNote', 'IonChip', 'IonBadge', 'IonRefresher', 'IonRefresherContent',
  'IonItemDivider', 'IonItemOption', 'IonItemOptions', 'IonItemSliding',
  'IonCard', 'IonCardTitle', 'IonCardContent'
].reduce((stubs, component) => ({
  ...stubs,
  [component]: {
    template: `<div class="stub-${component}" data-test="${component}"><slot /></div>`
  }
}), {})

// グローバルなテスト設定
config.global.plugins = [IonicVue, createPinia()]
config.global.stubs = {
  ...ionicStubs,
  transition: false
}

// グローバルなマウントオプション
config.global.mocks = {
  $router: {
    push: vi.fn()
  }
}