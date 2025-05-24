import { SupportedProtocolNames } from '@/enums'
import { fetchWithTimeout, initOutput } from '@/utils'
import { NextResponse } from 'next/server'

export async function GET() {
    // prepare the response object
    const debug = false
    const responseBody = initOutput<undefined>()

    try {
        // debug
        if (debug) console.log(`fetching ${SupportedProtocolNames.FELIX} ...`)

        /**
         * hype troves
         */

        // fetch
        const url = 'https://usefelix.xyz/borrow'
        const hypeTrovesResponse = await fetchWithTimeout(url, {
            method: 'POST',
            headers: {
                accept: 'text/x-component',
                'content-type': 'text/plain;charset=UTF-8',
                'next-action': '4084c2f978ea06db419a9b805d7039d67662cd1504',
                origin: 'https://usefelix.xyz',
            },
            body: '["HYPE"]',
        })

        // error
        if (!hypeTrovesResponse.ok) {
            responseBody.error = `Error fetching ${url}`
            return NextResponse.json(responseBody, { status: hypeTrovesResponse.status })
        }

        /**
         * ubtc troves
         */

        /**
         * parse
         */

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
