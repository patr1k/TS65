import DataBus from "./DataBus.ts";
import { byte, word } from "./utils.ts";

abstract class AbstractMemory {
    protected _bus: DataBus | null = null;

    abstract get size(): number;
    abstract readByte(addr: word): byte;
    abstract writeByte(data: byte, addr: word): void;
    
    reset(): void {

    }
    
    tick(): void {

    }

    setBus(bus: DataBus): void {
        this._bus = bus;
    }
}

export default AbstractMemory;