import { createContext } from 'react'

export type BudgetMode = 'budget' | 'expenses'
export default createContext<BudgetMode>('budget')
