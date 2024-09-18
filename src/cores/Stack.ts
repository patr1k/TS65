import comp from "../Computer.ts";

export function pha() {
    comp.cpu.pushByte(comp.cpu.reg.A);
}

export function php() {
    comp.cpu.pushByte(comp.cpu.reg.P);
}

export function pla() {
    comp.cpu.reg.A = comp.cpu.pullByte();
}

export function plp() {
    comp.cpu.reg.P = comp.cpu.pullByte();
}