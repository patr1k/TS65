import CPU from "./CPU.ts";
import MemoryController from "./MemoryController.ts";
import Registers from "./Registers.ts";

abstract class AbstractCore {
    protected cpu: CPU;
    protected reg: Registers;
    protected mem: MemoryController;

    constructor(cpu: CPU, reg: Registers, mem: MemoryController) {
        this.cpu = cpu;
        this.reg = reg;
        this.mem = mem;
    }

    abstract tick(): void;
}

export default AbstractCore;