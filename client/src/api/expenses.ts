import fetch from './fetch'
import type * as ExpensesApi from '@server/api/expenses'

export function getExpenses(id: string) {
  return fetch<ExpensesApi.GetResponseBody>('expenses/' + id)
}

export function createExpense(properties: ExpensesApi.CreateRequestBody) {
  return fetch<ExpensesApi.CreateResponseBody>('expenses/', 'POST', JSON.stringify(properties))
}

export function updateExpense(id: string, properties: ExpensesApi.UpdateRequestBody) {
  return fetch<ExpensesApi.UpdateResponseBody>('expenses/' + id, 'PUT', JSON.stringify(properties))
}

export function deleteExpense(id: string) {
  return fetch<ExpensesApi.DeleteResponseBody>('expenses/' + id, 'DELETE')
}
