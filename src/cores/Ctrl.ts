import comp from "../Computer.ts";
import { word } from "../utils.ts";

export function brk() {
    comp.cpu.pushWord(comp.cpu.reg.PC);
    comp.cpu.pushByte(comp.cpu.reg.P);
    comp.cpu.reg.B = true;
    comp.cpu.reg.PC = comp.bus.readWord(0xFFFE);
}

export function jmp_abs(value: word) {
    comp.cpu.reg.PC = value;
}

export function jmp_ind(value: word) {
    comp.cpu.reg.PC = comp.bus.readWord(value);
}

export function jsr_abs(value: word) {
    comp.cpu.pushWord(comp.cpu.reg.PC);
    comp.cpu.reg.PC = value;
}

export function rti() {
    comp.cpu.reg.P = comp.cpu.pullByte();
    comp.cpu.reg.PC = comp.cpu.pullWord();
}

export function rts() {
    const addr = comp.cpu.pullWord();
    comp.cpu.reg.PC = addr;
}