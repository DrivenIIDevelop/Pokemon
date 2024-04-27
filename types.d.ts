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
}

declare interface Expense {}
