import { SupportedProtocolNames } from '@/enums'
import { fetchWithTimeout, initOutput } from '@/utils'
import { NextResponse } from 'next/server'

export async function GET() {
    // prepare the response object
    const debug = false
    const responseBody = initOutput<string>()

    try {
        // debug
        if (debug) console.log(`fetching ${SupportedProtocolNames.HYPERBEAT} ...`)

        // run req
        const VAULT_ADDRESS = '0x53a333e51e96fe288bc9add7cdc4b1ead2cd2ffa'
        const url = `https://app.hyperbeat.org/earn/${VAULT_ADDRESS}?_rsc=xprhx`
        const fetchResponse = await fetchWithTimeout(url, {
            headers: {
                accept: '*/*',
                referer: 'https://app.hyperbeat.org/earn',
                'next-router-prefetch': '1',
                rsc: '1',
                'next-url': '/dapp/earn',
            },
        })

        // error
        if (!fetchResponse.ok) {
            responseBody.error = `Error fetching ${url}`
            return NextResponse.json(responseBody, { status: fetchResponse.status })
        }

        /**
         * parse
         */

        const text = await fetchResponse.text()
        responseBody.data = String(text)

        /**
         * finally
         */

        responseBody.success = true
        return NextResponse.json(responseBody)
    } catch (error) {
        responseBody.error = `Internal server error while fetching ${SupportedProtocolNames.FELIX}.`
        return NextResponse.json(responseBody, { status: 500 })
    }
}
