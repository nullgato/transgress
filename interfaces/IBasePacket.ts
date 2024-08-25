import type { PacketType } from '../types'

interface IBasePacket<T> {
    type: PacketType
    data: T
}

export type { IBasePacket }
