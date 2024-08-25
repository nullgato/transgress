import type { RouterResponse } from '../types'
import type { IMiddlewareRegistration } from './'

interface IMiddleware {
    middlewares: IMiddlewareRegistration[]

    register: (middleware: IMiddlewareRegistration) => IMiddleware
    apply: (req: Request) => RouterResponse
}

export type { IMiddleware }
