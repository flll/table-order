// 日付フォーマット
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// 金額フォーマット
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  }).format(price)
}

// 注文番号フォーマット
export const formatOrderNumber = (id: string): string => {
  return `#${id.slice(-6).toUpperCase()}`
}

// テーブル番号フォーマット
export const formatTableNumber = (number: number): string => {
  return `Table ${number}`
} 