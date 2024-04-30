declare interface Budget {
  _id: string
  name: string
  limit: number
}

declare interface Category<Populate = false> {
  _id: string
  name: string
  limit: number
  icon?: string
  budget?: Populate extends true ? Budget : string
}

declare interface Expense<Populate = false> {
  _id: string
  title: string
  amount: number
  description?: string
  frequency?: 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annually'
  date: Date
  category?: Populate extends true ? Category : string
}
