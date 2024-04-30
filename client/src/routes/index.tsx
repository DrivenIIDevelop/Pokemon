import { LoaderFunction, useLoaderData } from 'react-router-dom'

interface ApiData {
  title: string
}

export const loader: LoaderFunction = async () => {
  const res = await fetch('/api')
  if (res.ok) {
    const { title } = (await res.json()) as ApiData
    return title
  } else {
    return `Error: ${res.statusText} (${res.status})`
  }
}

export function Component() {
  const title = useLoaderData() as ApiData['title']
  return <h1>{title}</h1>
}
