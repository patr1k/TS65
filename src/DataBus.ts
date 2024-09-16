import AbstractMemory from "./AbstractMemory.ts";
import CPU from "./CPU.ts";
import IMemorySegment from "./IMemorySegment.ts";
import { byte, to_addr, to_hex, word } from "./utils.ts";

class DataBus {
    protected _address: word = 0x0;
    protected _data: byte = 0x0;
    protected _map: IMemorySegment[] = [];
    protected _cpu: CPU | null = null;
    protected _instr: byte = 0x0;

    constructor() {

    }

    public setCPU(cpu: CPU) {
        this._cpu = cpu;
    }

    registerSegment(startAddr: word, endAddr: word, memory: AbstractMemory) {
        memory.setBus(this);
        this._map.push({startAddr, endAddr, memory});
    }

    get address(): word {
        return this._address;
    }

    set address(addr: word) {
        this._address = addr;
    }

    get data(): byte {
        return this._data;
    }

    set data(data: byte) {
        this._data = data;
    }

    get instruction(): byte {
        return this._instr;
    }

    set instruction(instr: byte) {
        this._instr = instr;
    }

    readByte(addr: word): byte {
        this._address = addr;

        for (const i in this._map) {
            if (this._map[i].startAddr <= this._address && this._map[i].endAddr >= this._address) {
                this._data = this._map[i].memory.readByte(this._address - this._map[i].startAddr);
                return this._data;
            }
        }
        console.log(`Reading from uninitialized memory: 0x${to_addr(addr)}`);
        Deno.exit();
    }

    writeByte(addr: word, data: byte) {
        this._address = addr;
        this._data = data;

        for (const i in this._map) {
            if (this._map[i].startAddr <= this._address && this._map[i].endAddr >= this._address) {
                this._map[i].memory.writeByte(this._data, this._address - this._map[i].startAddr);
                return;
            }
        }
        console.log(`Writing to uninitialized memory: ${to_hex(data)} -> 0x${to_addr(addr)}`);
        Deno.exit();
    }

    readWord(addr: word): word {
        return this.readByte(addr) + (this.readByte(addr + 1) << 8);
    }

    writeWord(data: word, addr: word): void {
        this.writeByte(addr, data & 0xFF);
        this.writeByte(addr + 1, (data >> 8) & 0xFF);
    }

    tick() {
        this._cpu?.tick();
        for (const i in this._map) {
            this._map[i].memory.tick();
        }
    }

    reset() {
        this._cpu?.reset();
        for (const i in this._map) {
            this._map[i].memory.reset();
        }
    }

    irq() {
        this._cpu?.irq();
    }
}

export default DataBus;