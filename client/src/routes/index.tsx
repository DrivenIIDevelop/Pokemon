import { useState, useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'
import Button from '@mui/material/Button'

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

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>{title}</h1>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <Button variant="outlined" onClick={() => location.reload()}>
                Refresh
            </Button>
        </>
    )
}
