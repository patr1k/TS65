import AbstractCore from "./AbstractCore.ts";
import DataBus from "./DataBus.ts";
import Registers from "./Registers.ts";
import Core6502 from "./cores/6502/Core.ts";
import { H, HL, L, byte, word } from "./utils.ts";

class CPU {
    protected _state: Registers;
    protected _bus: DataBus;
    protected _core: AbstractCore;
    protected _speed: number = 10;

    protected _IR: byte = 0x00;

    constructor(bus: DataBus) {
        this._bus = bus;
        this._bus.setCPU(this);
        this._state = new Registers();
        this._core = new Core6502(this, this._state, bus);
    }

    public setSpeed(hz: number) {
        this._speed = 1000 / hz;
    }

    public reset() {
        this._state.reset();
        this._state.PC = this._bus.readWord(0xFFFC);
        console.log('Reset vector: ' + this._state.PC.toString(16));
    }

    public tick() {
        this._core.tick();
    }

    public fetchByte(): byte {
        return this._bus.readByte(this._state.PC++);
    }

    public fetchWord(): word {
        const word = this._bus.readWord(this._state.PC);
        this._state.PC += 2;
        return word;
    }

    public pushByte(val: byte): void {
        this._bus.writeByte(this._state.SP, val);
        this._state.SP -= 1;
    }

    public pushWord(val: word): void {
        this.pushByte(H(val));
        this.pushByte(L(val));
    }

    public pullByte(): byte {
        this._state.SP += 1;
        const val = this._bus.readByte(this._state.SP);
        return val;
    }

    public pullWord(): word {
        const low = this.pullByte();
        const high = this.pullByte();
        return HL(high, low);
    }

    public irq() {
        this.pushWord(this._state.PC);
        this.pushByte(this._state.P);
        this._state.PC = this._bus.readWord(0xFFFE);
    }
}

export default CPU;