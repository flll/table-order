<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>カート</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="empty-cart" v-if="!cartItems.length">
        <ion-icon :icon="cartOutline" size="large" />
        <p>カートは空です</p>
      </div>

      <ion-list v-else>
        <ion-item-sliding v-for="item in cartItems" :key="item.id">
          <ion-item>
            <ion-thumbnail slot="start">
              <img :src="item.image" :alt="item.name">
            </ion-thumbnail>
            <ion-label>
              <h2>{{ item.name }}</h2>
              <p>¥{{ item.price.toLocaleString() }}</p>
            </ion-label>
            <ion-note slot="end">
              <ion-button fill="clear" @click="decrementQuantity(item)">
                <ion-icon :icon="removeOutline" />
              </ion-button>
              <span class="quantity">{{ item.quantity }}</span>
              <ion-button fill="clear" @click="incrementQuantity(item)">
                <ion-icon :icon="addOutline" />
              </ion-button>
            </ion-note>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="removeFromCart(item.id)">
              <ion-icon :icon="trashOutline" slot="icon-only" />
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>

        <ion-item>
          <ion-label>
            <h2>合計</h2>
          </ion-label>
          <ion-note slot="end">
            <h2>¥{{ cartTotal.toLocaleString() }}</h2>
          </ion-note>
        </ion-item>
      </ion-list>

      <ion-footer class="ion-no-border" v-if="cartItems.length">
        <ion-toolbar>
          <ion-button expand="block" @click="submitOrder" :disabled="isSubmitting">
            注文を確定する
          </ion-button>
        </ion-toolbar>
      </ion-footer>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonThumbnail,
  IonLabel,
  IonNote,
  IonButton,
  IonIcon,
  IonFooter
} from '@ionic/vue'
import {
  cartOutline,
  addOutline,
  removeOutline,
  trashOutline
} from 'ionicons/icons'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'
import { useRouter } from 'vue-router'
import type { CartItem } from '@/stores/order'

const store = useOrderStore()
const router = useRouter()
const isSubmitting = ref(false)

const { cartItems, cartTotal } = storeToRefs(store)

const incrementQuantity = (item: CartItem) => {
  store.updateQuantity(item.id, item.quantity + 1)
}

const decrementQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    store.updateQuantity(item.id, item.quantity - 1)
  } else {
    store.removeFromCart(item.id)
  }
}

const removeFromCart = (itemId: number) => {
  store.removeFromCart(itemId)
}

const submitOrder = async () => {
  try {
    isSubmitting.value = true
    await store.submitOrder()
    router.push('/tabs/orders')
  } catch (error) {
    console.error('注文送信エラー:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--ion-color-medium);
}

.empty-cart ion-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.quantity {
  margin: 0 10px;
  font-size: 1.1em;
}

ion-footer {
  padding: 16px;
}
</style> 