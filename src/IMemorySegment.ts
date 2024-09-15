import AbstractMemory from "./AbstractMemory.ts";
import { word } from "./utils.ts";

interface IMemorySegment {
    startAddr: word,
    endAddr: word,
    memory: AbstractMemory
}

export default IMemorySegment;