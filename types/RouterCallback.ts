import type { RouterResponse } from './RouterResponse'

type RouterCallback = {
    (req: Request): RouterResponse
}

export type { RouterCallback }
