import IMemory from "./IMemory.ts";
import { word } from "./utils.ts";

interface IMemorySegment {
    startAddr: word,
    endAddr: word,
    memory: IMemory
}

export default IMemorySegment;