import type { WebSocketHandler } from 'bun'
import type { ErrorHandler } from '../types'
import type { IMiddleware } from './'

interface ITransgressOptions<T = undefined> {
    development: boolean
    errorHandler?: ErrorHandler
    middleware: IMiddleware
    port: number
    websocket?: WebSocketHandler<T>
}

export type { ITransgressOptions }
