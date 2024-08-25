import type { Route, RouterCallback } from '../types'

interface IRouter {
    routes: Route[]
    get: (path: string, callback: RouterCallback) => IRouter
    post: (path: string, callback: RouterCallback) => IRouter
    put: (path: string, callback: RouterCallback) => IRouter
    delete: (path: string, callback: RouterCallback) => IRouter
    patch: (path: string, callback: RouterCallback) => IRouter
}

export type { IRouter }
