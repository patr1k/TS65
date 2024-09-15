import IMemory from "./IMemory.ts";
import { byte, word } from "./utils.ts";

class RAM implements IMemory {
    private _size: number;
    data: number[];

    constructor(size: number = 0xFFFF) {
        this._size = size;
        this.data = Array(size).fill(0x00);
    }

    get size(): number {
        return this._size;
    }

    readByte(addr: word): byte {
        return this.data[addr];
    }

    writeByte(data: byte, addr: word): void {
        this.data[addr] = data;
    }
}

export default RAM;