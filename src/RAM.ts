import AbstractMemory from "./AbstractMemory.ts";
import { byte, word } from "./utils.ts";

class RAM extends AbstractMemory {
    private _size: number;
    data: number[];

    constructor(size: number = 0xFFFF) {
        super();
        this._size = size;
        this.data = Array(size).fill(0x00);
    }

    tick(): void {}

    get size(): number {
        return this._size;
    }

    readByte(addr: word): byte {
        return this.data[addr];
    }

    writeByte(data: byte, addr: word): void {
        this.data[addr] = data;
    }

    reset() {
        this.data = Array(this._size).fill(0x00);
    }
}

export default RAM;