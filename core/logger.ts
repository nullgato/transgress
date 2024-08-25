import chalk from 'chalk'
import type { ILogger, ILogObject } from '../interfaces'
import { OLogLevel, type LogLevel } from '../types'

class Logger implements ILogger {
    private _minLogLevel: LogLevel

    constructor(defaultLogLevel: LogLevel = OLogLevel.Info) {
        this._minLogLevel = defaultLogLevel
    }

    log(logObject: ILogObject, logLevel: LogLevel): ILogger {
        const prefixText = this.getLogPrefix(logLevel)
        const debugObjJson = logObject.debugObject ? JSON.stringify(logObject.debugObject, null, 4) : undefined

        console.log(
            `${prefixText} ${logLevel === OLogLevel.Fatal ? chalk.bgRed(logObject.message) : logObject.message}${
                !debugObjJson ? '' : '\n' + debugObjJson + '\n'
            }`
        )

        return this
    }

    logTrace(data: string | ILogObject): ILogger {
        return this.minLogLevel > OLogLevel.Trace
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Trace)
    }

    logDebug(data: string | ILogObject): ILogger {
        return this.minLogLevel > OLogLevel.Debug
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Debug)
    }

    logInfo(data: string | ILogObject): ILogger {
        return this.minLogLevel > OLogLevel.Info
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Info)
    }

    logWarn(data: string | ILogObject): ILogger {
        return this.minLogLevel > OLogLevel.Warn
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Warn)
    }

    logError(data: string | ILogObject): ILogger {
        return this.minLogLevel > OLogLevel.Error
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Error)
    }

    logFatal(data: string | ILogObject): ILogger {
        return this.minLogLevel > OLogLevel.Fatal
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Fatal)
    }

    private getTimeText(): string {
        const now = new Date()
        const hoursText = `${now.getUTCHours() < 10 ? '0' + now.getUTCHours() : now.getUTCHours()}`
        const minutesText = `${now.getUTCMinutes() < 10 ? '0' + now.getUTCMinutes() : now.getUTCMinutes()}`
        const secondsText = `${now.getUTCSeconds() < 10 ? '0' + now.getUTCSeconds() : now.getUTCSeconds()}`
        return `${hoursText}:${minutesText}:${secondsText}Z`
    }

    private getLogPrefix(logLevel: LogLevel): string {
        switch (logLevel) {
            case OLogLevel.Trace:
                return chalk.gray(`[TRACE:\t${this.getTimeText()}]`)
            case OLogLevel.Debug:
                return chalk.blue(`[DEBUG:\t${this.getTimeText()}]`)
            case OLogLevel.Info:
                return chalk.green(`[INFO:\t${this.getTimeText()}]`)
            case OLogLevel.Warn:
                return chalk.yellow(`[WARN:\t${this.getTimeText()}]`)
            case OLogLevel.Error:
                return chalk.red(`[ERROR:\t${this.getTimeText()}]`)
            case OLogLevel.Fatal:
                return chalk.redBright.bold(`[FATAL:\t${this.getTimeText()}]`)
        }
    }

    get minLogLevel(): LogLevel {
        const logLevel = Bun.env.LOG_LEVEL
        if (!logLevel) return this._minLogLevel

        try {
            return parseInt(logLevel) as LogLevel
        } catch {
            return this._minLogLevel
        }
    }
}

export { Logger }
