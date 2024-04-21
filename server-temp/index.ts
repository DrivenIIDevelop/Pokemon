import {
    Configuration,
    PlaidApi,
    Products,
    CountryCode,
    PlaidEnvironments,
    type ItemPublicTokenExchangeResponse,
} from 'plaid'

// Create a `.env.local` file at root with CLIENT_ID and SANDBOX_SECRET
const { VITE_API_HOST, VITE_API_PORT, CLIENT_ID, SANDBOX_SECRET } = process.env
console.log(VITE_API_HOST)

const client = new PlaidApi(
    new Configuration({
        basePath: PlaidEnvironments.sandbox,
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': CLIENT_ID,
                'PLAID-SECRET': SANDBOX_SECRET,
            },
        },
    }),
)

// User's Plaid Token - NEVER HANDLE USER DATA THIS WAY
let token: ItemPublicTokenExchangeResponse | undefined

const server = Bun.serve({
    port: VITE_API_PORT,
    hostname: VITE_API_HOST,
    async fetch(request, server) {
        const url = new URL(request.url)
        if (url.pathname.startsWith('/plaid/link-token')) {
            const userId = url.searchParams.get('user-id')
            if (!userId) return new Response('Missing User Id', { status: 400 })
            const response = await client.linkTokenCreate({
                user: { client_user_id: userId },
                client_name: 'Cash Dragon',
                country_codes: [CountryCode.Us],
                products: [Products.Transactions],
                language: 'en',
            })
            return new Response(JSON.stringify(response.data), { headers: { 'Content-Type': 'application/json' } })
        }
        if (url.pathname.startsWith('/plaid/exchange-public-token')) {
            const publicToken = url.searchParams.get('public-token')
            if (!publicToken) return new Response('Missing Public Token', { status: 400 })
            const response = await client.itemPublicTokenExchange({ public_token: publicToken })
            token = response.data
            return new Response('Success', { status: 200 })
        }
        if (url.pathname.startsWith('/plaid/transactions')) {
            if (!token) return new Response('Unauthorized', { status: 403 })
            try {
                const response = await client.transactionsSync({
                    access_token: token.access_token,
                    secret: SANDBOX_SECRET,
                })
                return new Response(JSON.stringify(response.data), { headers: { 'Content-Type': 'application/json' } })
            } catch (err) {
                console.log(err)
                return new Response('Something went wrong!', { status: 400 })
            }
        }
        return new Response('Page Not Found', { status: 404 })
    },
})

console.log(`Server running at ${server.url.href}`)
