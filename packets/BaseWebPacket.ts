import type { IBasePacket } from '../interfaces'
import type { PacketType } from '../types'

abstract class BaseWebPacket<T> implements IBasePacket<T> {
    constructor(public type: PacketType, public data: T) {}

    static serialize = (packet: IBasePacket<unknown>) => {
        return btoa(JSON.stringify({ type: packet.type, data: packet.data }))
    }

    static deserialize = <T>(packetBase64: string): IBasePacket<T> => {
        const packet = atob(packetBase64)
        return JSON.parse(packet) as IBasePacket<T>
    }
}

export { BaseWebPacket }
