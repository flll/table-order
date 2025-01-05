<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>メニュー管理（プレビュー）</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>新規カテゴリー追加</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-item>
                  <ion-label position="stacked">カテゴリー名</ion-label>
                  <ion-input v-model="newCategory.name" required></ion-input>
                </ion-item>
                <ion-button expand="block" class="ion-margin-top" @click="addCategory">
                  カテゴリーを追加
                </ion-button>
              </ion-card-content>
            </ion-card>

            <ion-card v-for="category in menuCategories" :key="category.id">
              <ion-card-header>
                <ion-card-title>{{ category.name }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <form @submit.prevent="handleSubmit(category.id)">
                  <ion-item>
                    <ion-label position="stacked">商品名</ion-label>
                    <ion-input v-model="newItems[category.id].name" required></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">説明</ion-label>
                    <ion-textarea v-model="newItems[category.id].description" required></ion-textarea>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">価格</ion-label>
                    <ion-input type="number" v-model="newItems[category.id].price" required></ion-input>
                  </ion-item>

                  <ion-item>
                    <ion-label position="stacked">画像URL</ion-label>
                    <ion-input v-model="newItems[category.id].image" required></ion-input>
                  </ion-item>

                  <ion-button type="submit" expand="block" class="ion-margin-top">
                    商品を追加
                  </ion-button>
                </form>

                <ion-list>
                  <ion-item v-for="item in category.items" :key="item.id">
                    <ion-label>
                      <h2>{{ item.name }}</h2>
                      <p>{{ item.description }}</p>
                      <p>¥{{ item.price }}</p>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>

            <ion-button expand="block" class="ion-margin" @click="showJson = true">
              JSONを表示
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-modal :is-open="showJson" @didDismiss="showJson = false">
        <ion-header>
          <ion-toolbar>
            <ion-title>メニューデータ（JSON）</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="showJson = false">閉じる</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <pre>{{ JSON.stringify({ categories: menuCategories }, null, 2) }}</pre>
        </ion-content>
      </ion-modal>
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
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonModal,
  IonButtons
} from '@ionic/vue'
import { ref, reactive } from 'vue'
import menuData from '../data/menu.json'

const showJson = ref(false)
const menuCategories = ref(menuData.categories)

const newCategory = ref({
  name: ''
})

const newItems = reactive<Record<number, {
  name: string,
  description: string,
  price: number | '',
  image: string
}>>({})

// 各カテゴリーの新規アイテムフォームを初期化
menuCategories.value.forEach(category => {
  newItems[category.id] = {
    name: '',
    description: '',
    price: '',
    image: ''
  }
})

const addCategory = () => {
  if (!newCategory.value.name) return

  const newId = Math.max(...menuCategories.value.map(c => c.id)) + 1
  menuCategories.value.push({
    id: newId,
    name: newCategory.value.name,
    items: []
  })

  // 新しいカテゴリーのフォームを初期化
  newItems[newId] = {
    name: '',
    description: '',
    price: '',
    image: ''
  }

  newCategory.value.name = ''
}

const handleSubmit = (categoryId: number) => {
  const category = menuCategories.value.find(c => c.id === categoryId)
  if (!category) return

  const newItem = newItems[categoryId]
  const newId = Math.max(...category.items.map(item => item.id), 0) + 1

  category.items.push({
    id: newId,
    name: newItem.name as string,
    description: newItem.description as string,
    price: Number(newItem.price),
    image: newItem.image as string
  })

  // フォームをリセット
  newItems[categoryId] = {
    name: '',
    description: '',
    price: '',
    image: ''
  }
}
</script>

<style scoped>
ion-card {
  margin: 16px;
}

form {
  padding: 16px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
}
</style> 