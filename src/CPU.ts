import AbstractCore from "./AbstractCore.ts";
import DataBus from "./DataBus.ts";
import Registers from "./Registers.ts";
import Core6502 from "./cores/6502/Core.ts";
import { byte, word } from "./utils.ts";

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
        this._bus.writeByte(val, this._state.SP--);
        this._state.SP -= 1;
    }

    public pushWord(val: word): void {
        this._bus.writeWord(val, this._state.SP - 2);
        this._state.SP -= 2;
    }

    public pullByte(): byte {
        const val = this._bus.readByte(this._state.SP);
        this._state.SP += 1;
        return val;
    }

    public pullWord(): word {
        const val = this._bus.readWord(this._state.SP);
        this._state.SP += 2;
        return val;
    }

    public irq() {
        this._state.PC = this._bus.readWord(0xFFFE);
    }
}

export default CPU;