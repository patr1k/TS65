import AbstractCore from "./AbstractCore.ts";
import DataBus from "./DataBus.ts";
import Registers from "./Registers.ts";
import Core6502 from "./cores/6502/Core.ts";
import { H, HL, L, byte, word } from "./utils.ts";

class CPU {
    public reg: Registers;
    public bus: DataBus;
    public core: AbstractCore;

    constructor(bus: DataBus) {
        this.bus = bus;
        this.bus.setCPU(this);
        this.reg = new Registers();
        this.core = new Core6502(this, this.reg, bus);
    }

    public reset() {
        this.reg.reset();
        this.reg.PC = this.bus.readWord(0xFFFC);
    }

    public tick() {
        this.core.tick();
    }

    public fetchByte(): byte {
        return this.bus.readByte(this.reg.PC++);
    }

    public fetchWord(): word {
        const word = this.bus.readWord(this.reg.PC);
        this.reg.PC += 2;
        return word;
    }

    public pushByte(val: byte): void {
        this.bus.writeByte(this.reg.SP, val);
        this.reg.SP -= 1;
    }

    public pushWord(val: word): void {
        this.pushByte(H(val));
        this.pushByte(L(val));
    }

    public pullByte(): byte {
        this.reg.SP += 1;
        const val = this.bus.readByte(this.reg.SP);
        return val;
    }

    public pullWord(): word {
        const low = this.pullByte();
        const high = this.pullByte();
        return HL(high, low);
    }

    public irq() {
        if (!this.reg.I) {
            this.pushWord(this.reg.PC);
            this.pushByte(this.reg.P);
            this.reg.PC = this.bus.readWord(0xFFFE);
        }
    }
}

export default CPU;