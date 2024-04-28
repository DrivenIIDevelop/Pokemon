declare interface Category {
  id: string
  name: string
  limit: number
  total: number
  subcategories: Subcategory[]
}

declare interface Subcategory {
  id: string
  name: string
  limit: number
  total: number
  icon?: string
  expenses: Expense[]
}

declare interface Expense {
  id: string
  title: string
  amount: 15
  description?: string
  frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annually'
  date: string
}