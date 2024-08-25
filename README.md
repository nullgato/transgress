# Transgress Webserver Framework for Bun

**Overcomplicated, very opinionated, maximalist web framework for [Bun](https://bun.sh)**

**This project is entirely typescript and is not meant to be used with JavaScript projects although I'm sure you probably could**

## Usage

```typescript
import { Logger, Middleware } from '@nullgato/transgress/core'
import { transgress } from '@nullgato/transgress'
import type { ILogger, ILogObject, ITransgressOptions } from '@nullgato/transgress/interfaces'
import { OLogLevel, type RouterResponse } from '@nullgato/transgress/types'

// you can write your own ILogger, but one is provided for you
const logger = new Logger(OLogLevel.Info)

// same with the IMiddleware interface
const middleware = new Middleware(logger)

middleware.register({
    name: 'middleware',
    callback: async (logger: ILogger, req: Request): RouterResponse => {
        return new Response('hewwo', { status: 200 })
    },
    log: (logger: ILogger, data: string | ILogObject): ILogger => {
        return logger
    },
})

const options: ITransgressOptions = {
    development: true,
    // the errorHandler is optional
    errorHandler: (error: Error) => {
        return new Response('rip', { status: 200 })
    },
    middleware,
    port: 12000,
}

const server = transgress(options)

// Server is now listening for connections
```

To add websocket handlers, you'll just need to add an object with type WebSocketHandler<T> where T is the data context you'll be using throughout the life of the websocket. This basically consists of open/close/message handlers.

## Installation

This is a Bun module available through the npm registry

Before installing, download and install Bun. Unknown which Bun version is required, this was tested with Bun v1.1.24

If this is a brand new project, make sure to create a package.json first with the `npm init` command

Install using the `bun install` command:

```bash
$ bun install @nullgato/transgress
```

Run using the `bun <script>` command:

```bash
$ bun index.ts
```

## Features

-   An alright routing system
-   Probably okay performance
-   A middleware system
-   Support for websockets (not really a flex, I'm running out of yays)
-   Support for HTML pages and {{variable}} within them
-   A template for websocket packets via `abstract class BasePacket`
-   Uhhhhh

## Philosophy

"It be what it be, and it do what it do." - me

_The project is a serious one, but ultimately this README is a parody of express.js because I'm too tired right now to think of something better_
