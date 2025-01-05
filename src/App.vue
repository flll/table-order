<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
:root {
  /* メインカラー */
  --ion-color-primary: #4f46e5;
  --ion-color-primary-rgb: 79, 70, 229;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #3730a3;
  --ion-color-primary-tint: #6366f1;

  /* セカンダリーカラー */
  --ion-color-secondary: #10b981;
  --ion-color-secondary-rgb: 16, 185, 129;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  --ion-color-secondary-shade: #047857;
  --ion-color-secondary-tint: #34d399;

  /* 背景色 */
  --ion-background-color: #f8fafc;
  --ion-background-color-rgb: 248, 250, 252;

  /* テキストカラー */
  --ion-text-color: #1e293b;
  --ion-text-color-rgb: 30, 41, 59;

  /* カードスタイル */
  --ion-card-background: #ffffff;
  --ion-card-border-radius: 1rem;
  --ion-card-box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  :root {
    /* メインカラー（ダーク） */
    --ion-color-primary: #818cf8;
    --ion-color-primary-rgb: 129, 140, 248;
    --ion-color-primary-contrast: #000000;
    --ion-color-primary-contrast-rgb: 0, 0, 0;
    --ion-color-primary-shade: #6366f1;
    --ion-color-primary-tint: #a5b4fc;

    /* セカンダリーカラー（ダーク） */
    --ion-color-secondary: #34d399;
    --ion-color-secondary-rgb: 52, 211, 153;
    --ion-color-secondary-contrast: #000000;
    --ion-color-secondary-contrast-rgb: 0, 0, 0;
    --ion-color-secondary-shade: #10b981;
    --ion-color-secondary-tint: #6ee7b7;

    /* 背景色（ダーク） */
    --ion-background-color: #000000;
    --ion-background-color-rgb: 0, 0, 0;

    /* テキストカラー（ダーク） */
    --ion-text-color: #ffffff;
    --ion-text-color-rgb: 255, 255, 255;

    /* カードスタイル（ダーク） */
    --ion-card-background: #262626;
    --ion-item-background: #262626;
    --ion-card-box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5);
  }

  /* カードタイトル（ダーク） */
  ion-card-title {
    color: #ffffff !important;
  }

  /* 入力フィールド（ダーク） */
  ion-input, ion-textarea {
    --background: #404040 !important;
    --color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  ion-input:focus, ion-textarea:focus {
    --background: #525252 !important;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  /* リストアイテム（ダーク） */
  ion-list ion-item {
    --background: #262626;
    --color: #ffffff;
  }

  /* メニューページのカードアイテム（ダーク） */
  ion-card ion-item {
    --background: #262626 !important;
    border-bottom: 1px solid #404040;
  }

  ion-card ion-item:last-child {
    border-bottom: none;
  }

  ion-card ion-item ion-label {
    color: #ffffff !important;
  }

  ion-card ion-item h2 {
    color: #ffffff !important;
  }

  ion-card ion-item p {
    color: #a3a3a3 !important;
  }

  ion-card ion-item h3 {
    color: var(--ion-color-primary) !important;
  }

  ion-card ion-thumbnail {
    --background: #404040;
  }

  /* プレビューエリア（ダーク） */
  pre {
    background: #404040;
    color: #ffffff;
  }

  /* モーダル（ダーク） */
  ion-modal ion-content {
    --background: #262626;
  }

  /* ボタン（ダーク） */
  ion-button {
    --background: var(--ion-color-primary);
    --background-hover: var(--ion-color-primary-shade);
    --background-activated: var(--ion-color-primary-shade);
    --background-focused: var(--ion-color-primary-shade);
  }
}

/* グローバルスタイル */
ion-content {
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
}

ion-card {
  margin: 1rem 0;
  border-radius: var(--ion-card-border-radius);
  box-shadow: var(--ion-card-box-shadow) !important;
}

ion-card-header {
  padding: 1.5rem 1.5rem 1rem;
}

ion-card-title {
  font-size: 1.25rem;
  font-weight: 600;
}

ion-card-content {
  padding: 0 1.5rem 1.5rem;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent;
}

ion-label {
  margin: 0.5rem 0;
  font-weight: 500;
}

/* 入力フィールドのスタイル */
ion-input, ion-textarea {
  --background: #f1f5f9;
  --padding-start: 1.25rem;
  --padding-end: 1.25rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

ion-input:focus, ion-textarea:focus {
  --background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* ボタンのスタイル */
ion-button {
  --border-radius: 1rem;
  --padding-top: 1rem;
  --padding-bottom: 1rem;
  --padding-start: 1.5rem;
  --padding-end: 1.5rem;
  margin: 1rem 0;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.025em;
  height: 3rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

ion-button::part(native) {
  padding-inline: 1.5rem;
}

/* 追加ボタン（+）のスタイル */
ion-button[slot="end"] {
  --padding-start: 0.75rem;
  --padding-end: 0.75rem;
  --padding-top: 0.75rem;
  --padding-bottom: 0.75rem;
  --border-radius: 0.75rem;
  margin: 0.5rem;
  height: 2.5rem;
  width: 2.5rem;
}

/* フォーム要素のスタイル */
form {
  padding: 1rem 0;
}

/* リストのスタイル */
ion-list {
  background: transparent;
  padding: 0;
}

ion-list ion-item {
  --padding-start: 1rem;
  --padding-end: 1rem;
  --padding-top: 0.75rem;
  --padding-bottom: 0.75rem;
  --background: #ffffff;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* モーダルのスタイル */
ion-modal {
  --height: 80%;
  --width: 90%;
  --border-radius: 1rem;
  --backdrop-opacity: 0.9;
}

ion-modal ion-content {
  --background: #1a1a1a;
}

ion-modal ion-toolbar {
  --background: #1a1a1a;
  --color: #ffffff;
  border-bottom: 1px solid #2d2d2d;
}

/* JSONプレビューのスタイル */
pre {
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 0.75rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
  color: #e2e8f0;
  margin: 1rem;
  border: 1px solid #2d2d2d;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

/* ダークモードでのJSONプレビュー */
@media (prefers-color-scheme: dark) {
  ion-modal {
    --backdrop-opacity: 0.95;
  }

  ion-modal ion-content {
    --background: #1a1a1a;
  }

  ion-modal ion-toolbar {
    --background: #1a1a1a;
    --color: #ffffff;
  }

  pre {
    background: #1e1e1e;
    color: #e2e8f0;
    border: 1px solid #2d2d2d;
  }
}

/* レスポンシブデザイン */
@media (min-width: 768px) {
  ion-content {
    --padding-start: 2rem;
    --padding-end: 2rem;
  }

  ion-modal {
    --width: 70%;
  }
}

@media (min-width: 1024px) {
  ion-content {
    --padding-start: 3rem;
    --padding-end: 3rem;
  }

  ion-modal {
    --width: 50%;
  }
}

/* メニューページのスタイル */
ion-card ion-item {
  --background: var(--ion-card-background);
  --padding-start: 1rem;
  --padding-end: 1rem;
  margin-bottom: 0.5rem;
}

ion-card ion-thumbnail {
  --size: 80px;
  margin: 10px;
}

ion-card ion-item h2 {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

ion-card ion-item h3 {
  color: var(--ion-color-primary);
  font-weight: 600;
}

ion-card ion-item p {
  color: var(--ion-text-color);
  opacity: 0.8;
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

/* カートページのスタイル */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
}

.empty-cart ion-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: var(--ion-color-medium);
}

.empty-cart p {
  color: var(--ion-color-medium);
  margin: 0.5rem 0;
}

.quantity {
  margin: 0 1rem;
  font-size: 1.1rem;
  font-weight: 500;
}

/* カートアイテムのスタイル */
ion-item-sliding {
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  overflow: hidden;
}

ion-item-sliding ion-item {
  --background: var(--ion-card-background);
  --padding-start: 1rem;
  --padding-end: 1rem;
  --border-radius: 1rem;
}

ion-item-sliding ion-item ion-thumbnail {
  --size: 80px;
  margin: 0.5rem 1rem 0.5rem 0;
}

ion-item-sliding ion-item h2 {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

ion-item-sliding ion-item p {
  color: var(--ion-color-primary);
  font-weight: 500;
}

/* ダークモード */
@media (prefers-color-scheme: dark) {
  /* カートアイテム（ダーク） */
  ion-item-sliding ion-item {
    --background: #262626 !important;
  }

  ion-item-sliding ion-item ion-label {
    color: #ffffff !important;
  }

  ion-item-sliding ion-item h2 {
    color: #ffffff !important;
  }

  ion-item-sliding ion-item p {
    color: var(--ion-color-primary) !important;
  }

  ion-item-sliding ion-item-options {
    background: #262626;
  }

  /* 合計表示（ダーク） */
  ion-list ion-item:last-child {
    --background: #262626 !important;
  }

  ion-list ion-item:last-child ion-label h2,
  ion-list ion-item:last-child ion-note h2 {
    color: #ffffff !important;
  }

  /* 数量調整ボタン（ダーク） */
  ion-button[fill="clear"] {
    --color: var(--ion-color-primary);
  }

  .quantity {
    color: #ffffff;
  }

  /* 空のカート表示（ダーク） */
  .empty-cart ion-icon,
  .empty-cart p {
    color: #666666;
  }
}
</style> 