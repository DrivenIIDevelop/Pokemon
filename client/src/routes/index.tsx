import { useState, useEffect } from 'react'

export function Component() {
    const [title, setTitle] = useState<string>('')

    useEffect(() => {
        void getTitle()
    })

    async function getTitle() {
        const res = await fetch('/api')
        if (res.ok) {
            const { title } = (await res.json()) as { title: string }
            setTitle(title)
        } else {
            console.error(`${res.statusText} (${res.status})`)
        }
    }

    return <h1>{title}</h1>
}
