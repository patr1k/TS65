import comp from "../Computer.ts";
import { byte, word } from "../utils.ts";

export function lda_im(value: byte) {
    comp.cpu.reg.A = value;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function lda_abs(value: byte) {
    comp.cpu.reg.A = comp.bus.readByte(value);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function lda_absx(value: byte) {
    comp.cpu.reg.A = comp.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function lda_absy(value: byte) {
    comp.cpu.reg.A = comp.bus.readByte(value + comp.cpu.reg.Y);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function lda_zpg(value: byte) {
    comp.cpu.reg.A = comp.bus.readByte(value);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function lda_zpgx(value: byte) {
    comp.cpu.reg.A = comp.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function lda_indx(value: byte) {
    const addr = comp.cpu.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.A = comp.cpu.bus.readByte(addr);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function lda_indy(value: byte) {
    const addr = comp.cpu.bus.readByte(value) + comp.cpu.reg.Y;
    comp.cpu.reg.A = comp.cpu.bus.readByte(addr);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}



export function ldx_im(value: byte) {
    comp.cpu.reg.X = value;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldx_abs(value: byte) {
    comp.cpu.reg.X = comp.bus.readByte(value);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldx_absy(value: byte) {
    comp.cpu.reg.X = comp.bus.readByte(value + comp.cpu.reg.Y);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldx_zpg(value: byte) {
    comp.cpu.reg.X = comp.bus.readByte(value);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldx_zpgy(value: byte) {
    comp.cpu.reg.X = comp.bus.readByte(value + comp.cpu.reg.Y);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}



export function ldy_im(value: byte) {
    comp.cpu.reg.Y = value;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldy_abs(value: byte) {
    comp.cpu.reg.Y = comp.bus.readByte(value);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldy_absx(value: byte) {
    comp.cpu.reg.Y = comp.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldy_zpg(value: byte) {
    comp.cpu.reg.Y = comp.bus.readByte(value);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ldy_zpgx(value: byte) {
    comp.cpu.reg.Y = comp.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}



export function sta_abs(value: word) {
    comp.bus.writeByte(value, comp.cpu.reg.A);
}

export function sta_absx(value: word) {
    comp.bus.writeByte(value + comp.cpu.reg.X, comp.cpu.reg.A);
}

export function sta_absy(value: word) {
    comp.bus.writeByte(value + comp.cpu.reg.Y, comp.cpu.reg.A);
}

export function sta_zpg(value: byte) {
    comp.bus.writeByte(value, comp.cpu.reg.A);
}

export function sta_zpgx(value: word) {
    comp.bus.writeByte(value + comp.cpu.reg.X, comp.cpu.reg.A);
}

export function sta_indx(value: word) {
    const addr = comp.cpu.bus.readByte(value + comp.cpu.reg.X);
    comp.bus.writeByte(addr, comp.cpu.reg.A);
}

export function sta_indy(value: word) {
    const addr = comp.cpu.bus.readByte(value) + comp.cpu.reg.Y;
    comp.bus.writeByte(addr, comp.cpu.reg.A);
}



export function stx_abs(value: word) {
    comp.bus.writeByte(value, comp.cpu.reg.X);
}

export function stx_zpg(value: word) {
    comp.bus.writeByte(value, comp.cpu.reg.X);
}

export function stx_zpgy(value: word) {
    comp.bus.writeByte(value + comp.cpu.reg.Y, comp.cpu.reg.X);
}



export function sty_abs(value: word) {
    comp.bus.writeByte(value, comp.cpu.reg.Y);
}

export function sty_zpg(value: word) {
    comp.bus.writeByte(value, comp.cpu.reg.Y);
}

export function sty_zpgx(value: word) {
    comp.bus.writeByte(value + comp.cpu.reg.X, comp.cpu.reg.Y);
}