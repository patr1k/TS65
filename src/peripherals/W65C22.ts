import AbstractMemory from "../AbstractMemory.ts";
import { byte, word } from "../utils.ts";

const Reg = {
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

const IFR = {
    IRQ: 0b10000000,
    T1:  0b01000000,
    T2:  0b00100000,
    CB1: 0b00010000,
    CB2: 0b00001000,
    SR:  0b00000100,
    CA1: 0b00000010,
    CA2: 0b00000001
};

const ACR = {
    T1: 0b11000000,
    T2: 0b00100000,
    SR: 0b00011100,
    PB: 0b00000010,
    PA: 0b00000001
};

const T1 = {
    TIMED_NO_PB:  0b00000000,
    CONT_NO_PB:   0b01000000,
    TIMED_ONCE:   0b10000000,
    CONT_SQ_WAVE: 0b11000000,
};

const IER = {
    SET: 0b10000000,
    T1:  0b01000000,
    T2:  0b00100000,
    CB1: 0b00010000,
    CB2: 0b00001000,
    SR:  0b00000100,
    CA1: 0b00000010,
    CA2: 0b00000001
};

class W65C22 extends AbstractMemory {
    private data: byte[];

    private porta_listeners: ((data: byte) => void)[] = [];
    private portb_listeners: ((data: byte) => void)[] = [];

    private t1_running = false;

    constructor() {
        super();
        this.data = Array(0xF).fill(0x00);
    }

    get size(): number {
        return 0xF;
    }

    readByte(addr: word): byte {
        const data = this.data[addr];

        switch (addr) {
            case Reg.T1CL:
                this.data[Reg.IFR] &= ~IFR.T1;
                break;
        }

        return data;
    }

    writeByte(data: byte, addr: word): void {
        this.data[addr] = data;

        switch (addr) {
            case Reg.PORTA:
                for (const i in this.porta_listeners) {
                    this.porta_listeners[i](data);
                }
                break;
            case Reg.PORTB:
                for (const i in this.portb_listeners) {
                    this.portb_listeners[i](data);
                }
                break;
            case Reg.T1CL:
                this.data[Reg.T1LL] = data;
                break;
            case Reg.T1CH:
                this.data[Reg.T1LH] = data;
                this.data[Reg.T1CL] = this.data[Reg.T1LL];
                this.t1_running = true;
                break;
        }
    }

    get T1C(): word {
        return this.data[Reg.T1CL] + (this.data[Reg.T1CH] << 8);
    }

    set T1C(val: word) {
        this.data[Reg.T1CL] = val & 0xFF;
        this.data[Reg.T1CH] = val >> 8;
    }

    get T2C(): word {
        return this.data[Reg.T2CL] + (this.data[Reg.T2CH] << 8);
    }

    set T2C(val: word) {
        this.data[Reg.T2CL] = val & 0xFF;
        this.data[Reg.T2CH] = val >> 8;
    }

    listenPortA(handler: (data: byte) => void) {
        this.porta_listeners.push(handler);
    }

    listenPortB(handler: (data: byte) => void) {
        this.portb_listeners.push(handler);
    }

    tick(): void {
      if (this.t1_running) {
        this.T1C--;
        if (this.T1C === 0) {
            switch (this.data[Reg.ACR] & ACR.T1) {
                case T1.TIMED_NO_PB:
                    this.data[Reg.IFR] |= IFR.T1;
                    this.t1_running = false;
                    if ((this.data[Reg.IER] & IER.SET) && (this.data[Reg.IER] & IER.T1)) {
                        // interrupt CPU
                        // console.log('T1 IRQ triggered');
                        this._bus!.irq();
                    }
                    break;
                case T1.CONT_NO_PB:
                    this.data[Reg.IFR] |= IFR.T1;
                    this.data[Reg.T1CH] = this.data[Reg.T1LH];
                    this.data[Reg.T1CL] = this.data[Reg.T1LL];
                    if ((this.data[Reg.IER] & IER.SET) && (this.data[Reg.IER] & IER.T1)) {
                        // interrupt CPU
                        // console.log('T1 IRQ triggered');
                        this._bus!.irq();
                    }
                    break;
            }
        }
      }
    }
}

export default W65C22;