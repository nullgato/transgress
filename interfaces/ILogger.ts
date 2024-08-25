import type { LogLevel } from '../types'
import type { ILogObject } from './'

interface ILogger {
    minLogLevel: LogLevel
    log: (logObject: ILogObject, logLevel: LogLevel) => ILogger
    logTrace: (data: string | ILogObject) => ILogger
    logDebug: (data: string | ILogObject) => ILogger
    logInfo: (data: string | ILogObject) => ILogger
    logWarn: (data: string | ILogObject) => ILogger
    logError: (data: string | ILogObject) => ILogger
    logFatal: (data: string | ILogObject) => ILogger
}

export type { ILogger }
