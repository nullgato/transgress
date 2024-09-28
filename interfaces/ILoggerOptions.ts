import type { LogLevel } from '../types'
import type { IIntlOptions } from './'

interface ILoggerOptions {
    logLevel: LogLevel
    intlOptions: IIntlOptions
    extraSpacing?: boolean
}

export type { ILoggerOptions }
