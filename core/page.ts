import type { BunFile } from 'bun'
import type { IKeyValuePair } from '../interfaces'

const processPage = async (
    file: BunFile,
    status: number,
    variables?: IKeyValuePair<string | number>
): Promise<Response> => {
    let html = await file.text()
    for (const key in variables) {
        const re = new RegExp(String.raw`\s{{${key}}}\s`, 'g')
        html = html.replace(re, variables[key] as string)
    }

    return new Response(html, { headers: { 'Content-Type': 'text/html' }, status })
}

export { processPage }
