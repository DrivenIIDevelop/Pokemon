import fetch from './fetch'
import type * as BudgetsApi from '@server/api/budgets'

export function getBudgets() {
  return fetch<BudgetsApi.GetAllResponseBody>('budgets')
}
