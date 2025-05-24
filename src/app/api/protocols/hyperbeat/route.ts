import { SupportedProtocolNames } from '@/enums'
import { initOutput } from '@/utils'
import { NextResponse } from 'next/server'

export async function GET() {
    // prepare the response object
    const debug = false
    const responseBody = initOutput<undefined>()

    try {
        // debug
        if (debug) console.log(`fetching ${SupportedProtocolNames.HYPERBEAT} ...`)

        // prepare request
        // tba

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
