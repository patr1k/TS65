import CPU from "./CPU.ts";
import DataBus from "./DataBus.ts";
import Registers from "./Registers.ts";

abstract class AbstractCore {
    protected cpu: CPU;
    protected reg: Registers;
    protected bus: DataBus;

    constructor(cpu: CPU, reg: Registers, bus: DataBus) {
        this.cpu = cpu;
        this.reg = reg;
        this.bus = bus;
    }

    abstract tick(): void;
}

export default AbstractCore;