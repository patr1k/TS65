import CPU from "./CPU.ts";
import Memory from "./Memory.ts";
import Registers from "./Registers.ts";
import { byte } from "./types.ts";

abstract class AbstractCore {
    protected cpu: CPU;
    protected reg: Registers;
    protected mem: Memory;

    constructor(cpu: CPU, reg: Registers, mem: Memory) {
        this.cpu = cpu;
        this.reg = reg;
        this.mem = mem;
    }

    abstract execute(instr: byte): void;
}

export default AbstractCore;