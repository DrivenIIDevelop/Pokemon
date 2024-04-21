import { useState, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { usePlaidLink } from 'react-plaid-link'

export function Component() {
    const [userId, setUserId] = useState('')
    const [linkToken, setLinkToken] = useState('')
    const [transactions, setTransactions] = useState('')

    async function getLinkToken() {
        const res = await fetch('api/plaid/link-token?user-id=' + userId)
        if (res.ok) {
            const data = await res.json()
            setLinkToken(data.link_token)
        } else {
            console.error(`${res.text()} - ${res.statusText} (${res.status})`)
        }
    }

    async function getTransactions() {
        const res = await fetch('api/plaid/transactions')
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setTransactions(JSON.stringify(data))
        } else {
            console.error(`${res.text()} - ${res.statusText} (${res.status})`)
        }
    }

    const { open, ready } = usePlaidLink({
        token: linkToken,
        async onSuccess(publicToken, metadata) {
            const res = await fetch('api/plaid/exchange-public-token?public-token=' + publicToken)
            if (res.ok) await getTransactions()
            else console.error(`${res.text()} - ${res.statusText} (${res.status})`)
        },
    })

    useEffect(() => {
        if (ready) open()
    }, [ready, open])

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <TextField
                label="User Id"
                variant="filled"
                required
                value={userId}
                onChange={event => setUserId(event.target.value)}
            />
            <Button variant="outlined" onClick={getLinkToken}>
                Submit
            </Button>
            <p>{transactions}</p>
        </Box>
    )
}
