import { createContext, type Dispatch } from 'react'
import { produce } from 'immer'

export type BudgetMode = 'budget' | 'expenses'
export interface IBudgetPageContext {
  budgets: PopulatedBudget[]
  mode: BudgetMode
}

export const BudgetPageContext = createContext<IBudgetPageContext>({ budgets: [], mode: 'budget' })
export const BudgetsDispatchContext = createContext<Dispatch<Action>>(() => {})

type Action =
  | { type: 'addExpense'; budgetId: string; expense: Expense }
  | { type: 'removeExpense'; budgetId: string; categoryId: string; expenseId: string }
  | { type: 'updateExpense'; budgetId: string; categoryId: string; expenseId: string; updates: Partial<Expense> }

export const budgetsReducer = produce((budgets: PopulatedBudget[], action: Action) => {
  switch (action.type) {
    case 'addExpense': {
      const budget = budgets.find(budget => budget._id === action.budgetId)
      if (!budget) throw Error(`Couldn't find budget with id "${action.budgetId}"`)
      const category = budget.categories.find(category => category._id === action.expense.category)
      if (!category) throw Error(`Couldn't find category in budget (${budget._id}) with id "${action.expense._id}"`)
      category.expenses.push(action.expense)
      break
    }

    case 'updateExpense': {
      const budget = budgets.find(budget => budget._id === action.budgetId)
      if (!budget) throw Error(`Couldn't find budget with id "${action.budgetId}"`)
      const category = budget.categories.find(category => category._id === action.categoryId)
      if (!category) throw Error(`Couldn't find category in budget (${budget._id}) with id "${action.categoryId}"`)
      const expenseIndex = category.expenses.findIndex(expense => expense._id === action.expenseId)
      if (!expenseIndex) throw Error(`Couldn't find expense in budget (${category._id}) with id "${action.categoryId}"`)
      category.expenses[expenseIndex] = { ...category.expenses[expenseIndex], ...action.updates }
      break
    }

    case 'removeExpense': {
      const budget = budgets.find(budget => budget._id === action.budgetId)
      if (!budget) throw Error(`Couldn't find budget with id "${action.budgetId}"`)
      const category = budget.categories.find(category => category._id === action.categoryId)
      if (!category) throw Error(`Couldn't find category in budget (${budget._id}) with id "${action.categoryId}"`)
      const expenseIndex = category.expenses.findIndex(expense => expense._id === action.expenseId)
      if (!expenseIndex) throw Error(`Couldn't find expense in budget (${category._id}) with id "${action.categoryId}"`)
      category.expenses.splice(expenseIndex, 1)
      break
    }

    default:
      throw Error('Unknown action: ' + (action as { type: string }).type)
  }
})
