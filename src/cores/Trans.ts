import comp from "../Computer.ts";

export function tax() {
    comp.cpu.reg.X = comp.cpu.reg.A;

    comp.cpu.reg.Z = comp.cpu.reg.X === 0;
    comp.cpu.reg.N = (comp.cpu.reg.X & 0x80) > 0;
}

export function tay() {
    comp.cpu.reg.Y = comp.cpu.reg.A;

    comp.cpu.reg.Z = comp.cpu.reg.Y === 0;
    comp.cpu.reg.N = (comp.cpu.reg.Y & 0x80) > 0;
}

export function tsx() {
    comp.cpu.reg.X = comp.cpu.reg.SP;

    comp.cpu.reg.Z = comp.cpu.reg.X === 0;
    comp.cpu.reg.N = (comp.cpu.reg.X & 0x80) > 0;
}

export function txa() {
    comp.cpu.reg.A = comp.cpu.reg.X;

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function txs() {
    comp.cpu.reg.SP = comp.cpu.reg.X;
}

export function tya() {
    comp.cpu.reg.A = comp.cpu.reg.Y;

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}