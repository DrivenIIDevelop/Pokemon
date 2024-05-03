declare interface Budget {
  _id: string
  name: string
  limit: number
}

declare interface Category<PopulateParent = false> {
  _id: string
  name: string
  limit: number
  icon?: string
  budget?: PopulateParent extends true ? Budget : string
}

declare interface Expense<PopulateParent = false> {
  _id: string
  title: string
  amount: number
  description?: string
  frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annually'
  date: Date
  category?: PopulateParent extends true ? Category : string
}

declare interface PopulatedBudget extends Budget {
  categories: PopulatedCategory[]
}
declare interface PopulatedCategory extends Category {
  expenses: Expense[]
}
