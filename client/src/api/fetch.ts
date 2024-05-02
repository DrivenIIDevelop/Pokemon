export default async function request<T = void>(
  path: string,
  method?: 'GET',
  query?: Record<string, string>,
): Promise<T>
export default async function request<T = void>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE',
  body?: string,
): Promise<T>
export default async function request<T = void>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: Record<string, string> | string,
): Promise<T> {
  let url = '/api/' + path
  const options: RequestInit = { method }
  if (body !== undefined) {
    if (typeof body == 'string') {
      options.body = body
      options.headers = { 'Content-Type': 'application/json' }
    } else url += '?' + new URLSearchParams(body).toString()
  }
  const res = await fetch(url, options)
  if (res.ok) {
    if (res.headers.get('content-type')?.includes('application/json')) return (await res.json()) as T
    // @ts-expect-error - Returning nothing causes error
    else return
  } else {
    throw new Error(`API Error (${options?.method ?? 'GET'}: ${path})`)
  }
}
