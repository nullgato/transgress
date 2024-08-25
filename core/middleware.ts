import chalk from 'chalk'
import type { ILogger, IMiddleware, IMiddlewareRegistration } from '../interfaces'
import type { RouterResponse } from '../types'

class Middleware implements IMiddleware {
    private _logger: ILogger
    private _middlewares: IMiddlewareRegistration[] = []

    constructor(logger: ILogger) {
        this._logger = logger
    }

    public register(middleware: IMiddlewareRegistration): IMiddleware {
        this._middlewares.push(middleware)
        this._logger.logInfo(`Registered middleware: ${middleware.name}`)
        return this
    }

    public async apply(req: Request): RouterResponse {
        this._logger.logTrace(`Total middleware: ${this._middlewares.length}`)

        let appliedMiddleware = 0
        for (const middleware of this._middlewares) {
            this._logger.logDebug(`🧩 Applying middleware: ${chalk.magenta.bold(middleware.name)}`)
            const result = await middleware.callback(this._logger, req)
            appliedMiddleware++

            if (!result) continue

            this._logger.logTrace(`Total middleware applied: ${appliedMiddleware}`)
            return result
        }

        this._logger.logDebug(`Middleware did not generate a response, defaulting to status: 404`)
        return new Response(null, { status: 404 })
    }

    get middlewares(): IMiddlewareRegistration[] {
        return this._middlewares
    }
}

export { Middleware }
