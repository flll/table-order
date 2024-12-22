<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
/* グローバルスタイル */
:root {
  --ion-color-primary: #3880ff;
  --ion-color-secondary: #3dc2ff;
  --ion-color-tertiary: #5260ff;
  --ion-background-color: #f4f5f8;
}

/* タブレット向けの最適化 */
@media (min-width: 768px) {
  ion-content {
    --padding-start: 20px;
    --padding-end: 20px;
  }
}
</style> 