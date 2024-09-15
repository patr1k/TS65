import IMemory from "./IMemory.ts";
import { byte, word } from "./utils.ts";

class InterfaceAdapter implements IMemory {
    private data: byte[];

    static Registers = {
        PORTB: 0x00,
        PORTA: 0x01,
        DDRB: 0x02,
        DDRA: 0x03,
        T1CL: 0x04,
        T1CH: 0x05,
        T1LL: 0x06,
        T1LH: 0x07,
        T2CL: 0x08,
        T2CH: 0x09,
        SR: 0x0A,
        ACR: 0x0B,
        PCR: 0x0C,
        IFR: 0x0D,
        IER: 0x0E,
    };

    constructor() {
        this.data = Array(0xF).fill(0x00);
    }

    get size(): number {
        return 0xF;
    }

    readByte(addr: word): byte {
        return this.data[addr];
    }

    writeByte(data: byte, addr: word): void {
        this.data[addr] = data;
    }
}

export default InterfaceAdapter;