<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="menu" href="/tabs/menu">
          <ion-icon :icon="restaurantOutline" />
          <ion-label>メニュー</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cart" href="/tabs/cart">
          <ion-icon :icon="cartOutline" />
          <ion-label>カート</ion-label>
          <ion-badge v-if="cartItemCount">{{ cartItemCount }}</ion-badge>
        </ion-tab-button>

        <ion-tab-button tab="orders" href="/tabs/orders">
          <ion-icon :icon="listOutline" />
          <ion-label>注文履歴</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  IonPage,
  IonRouterOutlet
} from '@ionic/vue'
import { restaurantOutline, cartOutline, listOutline } from 'ionicons/icons'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '@/stores/order'

const store = useOrderStore()
const { cartItemCount } = storeToRefs(store)
</script> 