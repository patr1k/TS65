import IMemory from "./IMemory.ts";
import { byte, to_addr, to_hex, word } from "./utils.ts";

class ROM implements IMemory {
    private _size: number;
    data: number[];

    constructor(file: string) {
        const bytes = Deno.readFileSync(file);
        this._size = bytes.byteLength;
        this.data = Array.from(bytes);
    }

    get size(): number {
        return this._size;
    }

    readByte(addr: word): byte {
        return this.data[addr];
    }

    writeByte(data: number, addr: number): void {
      console.log(`Cannot write to ROM: ${to_hex(data)} -> 0x${to_addr(addr)}`);
      Deno.exit();
    }
}

export default ROM;