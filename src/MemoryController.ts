import AbstractMemory from "./AbstractMemory.ts";
import CPU from "./CPU.ts";
import IMemorySegment from "./IMemorySegment.ts";
import { byte, to_addr, to_hex, word } from "./utils.ts";

class MemoryController {
    protected cpu: CPU | null = null;
    protected map: IMemorySegment[] = [];

    registerSegment(startAddr: word, endAddr: word, memory: AbstractMemory) {
        this.map.push({startAddr, endAddr, memory});
    }

    protected getByte(addr: word) {
        for (const i in this.map) {
            if (this.map[i].startAddr <= addr && this.map[i].endAddr >= addr) {
                return this.map[i].memory.readByte(addr - this.map[i].startAddr);
            }
        }
        console.log(`Reading from uninitialized memory: 0x${to_addr(addr)}`);
        Deno.exit();
    }

    protected setByte(addr: word, data: byte) {
        for (const i in this.map) {
            if (this.map[i].startAddr <= addr && this.map[i].endAddr >= addr) {
                this.map[i].memory.writeByte(data, addr - this.map[i].startAddr);
                return;
            }
        }
        console.log(`Writing to uninitialized memory: ${to_hex(data)} -> 0x${to_addr(addr)}`);
        Deno.exit();
    }

    readByte(addr: word): byte {
        return this.getByte(addr);
    }

    readWord(addr: word): word {
        return this.getByte(addr) + (this.getByte(addr + 1) << 8);
    }

    writeByte(data: byte, addr: word): void {
        this.setByte(addr, data);
    }

    writeWord(data: word, addr: word): void {
        this.setByte(addr, data & 0xFF);
        this.setByte(addr + 1, (data >> 8) & 0xFF);
    }

    tick(): void {
        for (const i in this.map) {
            this.map[i].memory.tick();
        }
    }

    setCPU(cpu: CPU): void {
        this.cpu = cpu;
    }

    irq(): void {
        this.cpu!.irq();
    }
}

export default MemoryController;