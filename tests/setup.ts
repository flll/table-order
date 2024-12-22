import { config } from '@vue/test-utils'
import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'

// Ionicコンポーネントのスタブ
const ionicStubs = ['IonPage', 'IonContent', 'IonHeader', 'IonToolbar', 'IonTitle', 
  'IonList', 'IonItem', 'IonLabel', 'IonButton', 'IonIcon', 'IonThumbnail',
  'IonNote', 'IonChip', 'IonBadge', 'IonRefresher', 'IonRefresherContent']
  .reduce((stubs, component) => ({
    ...stubs,
    [component]: true
  }), {})

// グローバルなテスト設定
config.global.plugins = [IonicVue, createPinia()]
config.global.stubs = {
  ...ionicStubs,
  transition: false
} 