import MemoryController from "./MemoryController.ts";
import { byte, word } from "./utils.ts";

abstract class AbstractMemory {
    protected _controller: MemoryController | null = null;

    abstract get size(): number;
    abstract readByte(addr: word): byte;
    abstract writeByte(data: byte, addr: word): void;
    
    tick(): void {

    }

    setController(ctrl: MemoryController): void {
        this._controller = ctrl;
    }
}

export default AbstractMemory;