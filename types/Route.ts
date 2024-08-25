import type { MethodType } from './MethodType'
import type { RouterCallback } from './RouterCallback'

type Route = { path: string; method: MethodType; callback: RouterCallback }

export type { Route }
