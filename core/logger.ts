import chalk from 'chalk'
import type { ILogger, ILoggerOptions, ILogObject } from '../interfaces'
import { OLogLevel, type LogLevel } from '../types'

class Logger implements ILogger {
    private _loggerOptions: ILoggerOptions

    constructor(loggerOptions: ILoggerOptions) {
        this._loggerOptions = loggerOptions
    }

    log(logObject: ILogObject, logLevel: LogLevel): ILogger {
        const prefixText = this.getLogPrefix(logLevel)
        const debugObjJson = logObject.debugObject ? JSON.stringify(logObject.debugObject, null, 4) : undefined
        let message = ''

        if (logLevel === OLogLevel.Fatal) message += chalk.bgRed(logObject.message)
        else {
            message += `${logObject.message}${!debugObjJson ? '' : '\n' + debugObjJson + '\n'}`
        }

        console.log(`${prefixText} ${message}${this._loggerOptions.extraSpacing ? '\n' : ''}`)

        return this
    }

    logTrace(data: string | ILogObject): ILogger {
        return this._loggerOptions.logLevel > OLogLevel.Trace
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Trace)
    }

    logDebug(data: string | ILogObject): ILogger {
        return this._loggerOptions.logLevel > OLogLevel.Debug
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Debug)
    }

    logInfo(data: string | ILogObject): ILogger {
        return this._loggerOptions.logLevel > OLogLevel.Info
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Info)
    }

    logWarn(data: string | ILogObject): ILogger {
        return this._loggerOptions.logLevel > OLogLevel.Warn
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Warn)
    }

    logError(data: string | ILogObject): ILogger {
        return this._loggerOptions.logLevel > OLogLevel.Error
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Error)
    }

    logFatal(data: string | ILogObject): ILogger {
        return this._loggerOptions.logLevel > OLogLevel.Fatal
            ? this
            : this.log(typeof data === 'string' ? { message: data } : (data as ILogObject), OLogLevel.Fatal)
    }

    private getTimeText(): string {
        const now = new Date()
        const opts: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: this.loggerOptions.intlOptions.timezone,
        }
        return Intl.DateTimeFormat(this.loggerOptions.intlOptions.locale, opts).format(now)
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

    get loggerOptions(): ILoggerOptions {
        return this._loggerOptions
    }
}

export { Logger }
