import AbstractCore from "./AbstractCore.ts";
import MemoryController from "./MemoryController.ts";
import Registers from "./Registers.ts";
import Core6502 from "./cores/6502/Core.ts";
import { byte, sleep, word } from "./utils.ts";

class CPU {
    protected _state: Registers;
    protected _memory: MemoryController;
    protected _core: AbstractCore;
    protected _speed: number = 10;

    constructor(memory: MemoryController, state: Registers) {
        this._state = state;
        this._memory = memory;
        this._core = new Core6502(this, this._state, this._memory);
    }

    public setSpeed(hz: number) {
        this._speed = 1000 / hz;
    }

    public reset() {
        this._state.reset();
        this._state.PC = this._memory.readWord(0xFFFC);
        console.log('Reset vector: ' + this._state.PC.toString(16));
    }

    public async run() {
        console.log('addr instr     disass        |AC XR YR SP|nvdizc');
        console.log('---- --------  --------------|-- -- -- --|------')

        let instr: byte | null = null;

        while (instr !== 0x00) {
            instr = this.fetchByte();
            this._core.execute(instr);
            await sleep(this._speed);
        }
    }

    public fetchByte(): byte {
        return this._memory.readByte(this._state.PC++);
    }

    public fetchWord(): word {
        const word = this._memory.readWord(this._state.PC);
        this._state.PC += 2;
        return word;
    }

    public pushByte(val: byte): void {
        this._memory.writeByte(val, this._state.SP--);
        this._state.SP -= 1;
    }

    public pushWord(val: word): void {
        this._memory.writeWord(val, this._state.SP - 2);
        this._state.SP -= 2;
    }

    public pullByte(): byte {
        const val = this._memory.readByte(this._state.SP);
        this._state.SP += 1;
        return val;
    }

    public pullWord(): word {
        const val = this._memory.readWord(this._state.SP);
        this._state.SP += 2;
        return val;
    }

    public noop() {

    }
}

export default CPU;