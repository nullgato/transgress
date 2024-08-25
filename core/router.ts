import type { ILogger, IRouter } from '../interfaces'
import type { MethodType, Route, RouterCallback } from '../types'

class Router implements IRouter {
    private _logger: ILogger
    private _routes: Route[] = []

    constructor(logger: ILogger) {
        this._logger = logger
    }

    public get(path: string, callback: RouterCallback): IRouter {
        return this.addRoute(path, 'GET', callback)
    }

    public post(path: string, callback: RouterCallback): IRouter {
        return this.addRoute(path, 'POST', callback)
    }

    public put(path: string, callback: RouterCallback): IRouter {
        return this.addRoute(path, 'PUT', callback)
    }

    public delete(path: string, callback: RouterCallback): IRouter {
        return this.addRoute(path, 'DELETE', callback)
    }

    public patch(path: string, callback: RouterCallback): IRouter {
        return this.addRoute(path, 'PATCH', callback)
    }

    private addRoute(path: string, method: MethodType, callback: RouterCallback): IRouter {
        this.logRegistration(method, path)
        this.routes.push({ path, method, callback })

        return this
    }

    private logRegistration(method: string, path: string): void {
        this._logger.logInfo(`Rotue registration: ${method} -> ${path}`)
    }

    get routes(): Route[] {
        return this._routes
    }

    set routes(value: Route[]) {
        throw new Error('Router.routes is not meant to be set directly')
    }
}

export { Router }
