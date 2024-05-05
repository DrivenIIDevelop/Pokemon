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
  | { type: 'addExpense'; budgetId: string; categoryId: string; expense: Expense }
  | { type: 'updateExpense'; budgetId: string; categoryId: string; expenseId: string; updatedExpense: Expense }
  | { type: 'removeExpense'; budgetId: string; categoryId: string; expenseId: string }
  | { type: 'addCategory'; budgetId: string; category: Category }
  | { type: 'updateCategory'; budgetId: string; categoryId: string; updatedCategory: Category }
  | { type: 'removeCategory'; budgetId: string; categoryId: string }

export const budgetsReducer = produce((budgets: PopulatedBudget[], action: Action) => {
  switch (action.type) {
    case 'addCategory': {
      const budget = findBudget(budgets, action.budgetId)
      budget.categories.push({ ...action.category, expenses: [] })
      break
    }
    case 'updateCategory': {
      const budget = findBudget(budgets, action.budgetId)
      const category = findCategory(budget, action.categoryId)
      updateProps(category, action.updatedCategory)
      break
    }
    case 'removeCategory': {
      const budget = findBudget(budgets, action.budgetId)
      const categoryIndex = findCategoryIndex(budget, action.categoryId)
      budget.categories.splice(categoryIndex, 1)
      break
    }

    case 'addExpense': {
      const budget = findBudget(budgets, action.budgetId)
      const category = findCategory(budget, action.categoryId)
      category.expenses.push(action.expense)
      break
    }
    case 'updateExpense': {
      const budget = findBudget(budgets, action.budgetId)
      const category = findCategory(budget, action.categoryId)
      const expense = findExpense(category, action.expenseId)
      updateProps(expense, action.updatedExpense)
      break
    }
    case 'removeExpense': {
      const budget = findBudget(budgets, action.budgetId)
      const category = findCategory(budget, action.categoryId)
      const expenseIndex = findExpenseIndex(category, action.expenseId)
      category.expenses.splice(expenseIndex, 1)
      break
    }

    default:
      throw Error('Unknown action: ' + (action as { type: string }).type)
  }
})

const updateProps = <T extends object>(object: T, props: Partial<T>) => {
  for (const key in props) object[key] = props[key] as T[typeof key]
}

const findBudget = (budgets: PopulatedBudget[], id: string) => {
  const budget = budgets.find(budget => budget._id === id)
  if (!budget) throw Error(`Couldn't find budget with id "${id}"`)
  return budget
}

const findCategory = (budget: PopulatedBudget, id: string) => {
  const category = budget.categories.find(category => category._id === id)
  if (!category) throw Error(`Couldn't find category in budget (${budget._id}) with id "${id}"`)
  return category
}

const findCategoryIndex = (budget: PopulatedBudget, id: string) => {
  const categoryIndex = budget.categories.findIndex(category => category._id === id)
  if (categoryIndex == -1) throw Error(`Couldn't find category in budget (${budget._id}) with id "${id}"`)
  return categoryIndex
}

const findExpense = (category: PopulatedCategory, id: string) => {
  const expense = category.expenses.find(expense => expense._id === id)
  if (!expense) throw Error(`Couldn't find expense in budget (${category._id}) with id "${id}"`)
  return expense
}

const findExpenseIndex = (category: PopulatedCategory, id: string) => {
  const expenseIndex = category.expenses.findIndex(expense => expense._id === id)
  if (expenseIndex == -1) throw Error(`Couldn't find expense in budget (${category._id}) with id "${id}"`)
  return expenseIndex
}
