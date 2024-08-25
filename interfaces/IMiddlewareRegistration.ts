import type { RouterResponse } from '../types'
import type { ILogger, ILogObject } from './'

interface IMiddlewareRegistration {
    name: string
    callback: (logger: ILogger, req: Request) => RouterResponse
    log: (logger: ILogger, data: string | ILogObject) => ILogger
}

export type { IMiddlewareRegistration }
