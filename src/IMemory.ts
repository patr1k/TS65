import { byte, word } from "./utils.ts";

interface IMemory {
    get size(): number;
    readByte(addr: word): byte;
    writeByte(data: byte, addr: word): void;
}

export default IMemory;