declare interface Budget {
  _id: string
  name: string
  limit: number
  categories: Category[]
}

declare interface Category {
  _id: string
  name: string
  limit: number
  icon?: string
  expenses: Expense[]
}

declare interface Expense {
  _id: string
  title: string
  amount: number
  description?: string
  frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annually'
  date: Date
}
