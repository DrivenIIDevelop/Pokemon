import fetch from './fetch'
import type * as CategoriesApi from '@server/api/categories'

export function getCategories() {
  return fetch<CategoriesApi.GetResponseBody>('categories')
}

export function createCategory(properties: CategoriesApi.CreateRequestBody) {
  return fetch<CategoriesApi.CreateResponseBody>('categories', 'POST', JSON.stringify(properties))
}

export function updateCatgeroy(id: string, properties: CategoriesApi.UpdateRequestBody) {
  return fetch<CategoriesApi.UpdateResponseBody>('categories/' + id, 'PUT', JSON.stringify(properties))
}

export function deleteCategory(id: string) {
  return fetch<CategoriesApi.DeleteResponseBody>('categories/' + id, 'DELETE')
}
