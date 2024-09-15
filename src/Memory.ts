import { byte, word } from "./types.ts";

class Memory {
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

    readWord(addr: word): word {
        return this.data[addr] + (this.data[addr + 1] << 8);
    }

    writeByte(data: byte, addr: word): void {
        this.data[addr] = data;
    }

    writeWord(data: word, addr: word): void {
        this.data[addr] = data & 0xFF;
        this.data[addr + 1] = data >> 8;
    }

    async loadProgram(file: string) {
        const bytes = await Deno.readFile(file);
        this._size = bytes.byteLength;
        this.data = Array.from(bytes);
    }
}

export default Memory;