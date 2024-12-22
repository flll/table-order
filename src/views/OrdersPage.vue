<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>注文履歴</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refreshOrders">
            <ion-icon :icon="refreshOutline" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content />
      </ion-refresher>

      <div class="no-orders" v-if="!activeOrders.length">
        <ion-icon :icon="receiptOutline" size="large" />
        <p>注文履歴がありません</p>
      </div>

      <ion-list v-else>
        <ion-item-group v-for="order in activeOrders" :key="order.timestamp">
          <ion-item-divider sticky>
            <ion-label>
              <h2>{{ formatDate(order.timestamp) }}</h2>
              <p>テーブル {{ order.tableNumber }}</p>
            </ion-label>
            <ion-note slot="end">
              <ion-chip :color="getOrderStatusColor(order.status)">
                {{ getOrderStatusText(order.status) }}
              </ion-chip>
            </ion-note>
          </ion-item-divider>

          <ion-item v-for="item in order.items" :key="item.id">
            <ion-label>
              <h3>{{ item.name }}</h3>
              <p v-if="item.options">
                {{ item.options.join(', ') }}
              </p>
            </ion-label>
            <ion-note slot="end">
              {{ item.quantity }}個
            </ion-note>
          </ion-item>

          <ion-item lines="none">
            <ion-label>
              <h3>合計</h3>
            </ion-label>
            <ion-note slot="end">
              ¥{{ calculateOrderTotal(order).toLocaleString() }}
            </ion-note>
          </ion-item>
        </ion-item-group>
      </ion-list>
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
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonChip,
  IonButton,
  IonButtons,
  IonIcon,
  IonRefresher,
  IonRefresherContent
} from '@ionic/vue'
import { refreshOutline, receiptOutline } from 'ionicons/icons'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'
import type { Order } from '@/stores/order'

const store = useOrderStore()
const { activeOrders } = storeToRefs(store)

const refreshOrders = async () => {
  try {
    await store.fetchActiveOrders()
  } catch (error) {
    console.error('注文履歴の更新に失敗:', error)
  }
}

const handleRefresh = async (event: CustomEvent) => {
  await refreshOrders()
  event.target.complete()
}

const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getOrderStatusColor = (status?: string) => {
  const colors: Record<string, string> = {
    pending: 'warning',
    processing: 'primary',
    completed: 'success',
    cancelled: 'danger'
  }
  return colors[status || ''] || 'medium'
}

const getOrderStatusText = (status?: string) => {
  const texts: Record<string, string> = {
    pending: '受付中',
    processing: '調理中',
    completed: '完了',
    cancelled: 'キャンセル'
  }
  return texts[status || ''] || '不明'
}

const calculateOrderTotal = (order: Order) => {
  return order.items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
}

onMounted(() => {
  refreshOrders()
})
</script>

<style scoped>
.no-orders {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--ion-color-medium);
}

.no-orders ion-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

ion-item-divider {
  --background: var(--ion-color-light);
}

ion-item-divider h2 {
  font-weight: bold;
}

ion-chip {
  margin: 0;
}
</style> 