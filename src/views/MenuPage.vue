<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>メニュー</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" v-for="category in menuCategories" :key="category.id">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ category.name }}</ion-card-title>
              </ion-card-header>
              
              <ion-list>
                <ion-item v-for="item in category.items" :key="item.id">
                  <ion-thumbnail slot="start">
                    <img :src="item.image" :alt="item.name">
                  </ion-thumbnail>
                  <ion-label>
                    <h2>{{ item.name }}</h2>
                    <p>{{ item.description }}</p>
                    <h3>¥{{ item.price.toLocaleString() }}</h3>
                  </ion-label>
                  <ion-button slot="end" @click="addToCart(item)">
                    <ion-icon :icon="addOutline" />
                  </ion-button>
                </ion-item>
              </ion-list>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonIcon
} from '@ionic/vue'
import { addOutline } from 'ionicons/icons'
import { ref } from 'vue'
import { useOrderStore } from '@/stores/order'
import type { MenuItem } from '@/stores/order'
import menuData from '@/data/menu.json'

const store = useOrderStore()
const menuCategories = ref(menuData.categories)

const addToCart = (item: MenuItem) => {
  store.addToCart(item)
}
</script>

<style scoped>
ion-thumbnail {
  --size: 80px;
  margin: 10px;
}

ion-card {
  margin: 16px;
}

ion-item h2 {
  font-weight: bold;
}

ion-item h3 {
  color: var(--ion-color-primary);
}
</style> 