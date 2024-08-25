import { serve, type Server } from 'bun'
import type { ITransgressOptions } from './interfaces'

const transgress = <T = undefined>(options: ITransgressOptions<T>): Server => {
    return !options.websocket
        ? serve({
              development: options.development,
              port: options.port,
              fetch: async (req: Request) => {
                  return options.middleware.apply(req) as Promise<Response>
              },
              error: options.errorHandler,
          })
        : serve<T>({
              development: options.development,
              port: options.port,
              fetch: async (req: Request) => {
                  return options.middleware.apply(req)
              },
              error: options.errorHandler,
              websocket: options.websocket,
          })
}

export { transgress }
