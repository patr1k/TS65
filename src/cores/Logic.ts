import comp from "../Computer.ts";
import { byte, word } from "../utils.ts";

export function and_im(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A & value;

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function and_zpg(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A & comp.bus.readByte(value);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function and_zpgx(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A & comp.bus.readByte(value + comp.cpu.reg.X);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function and_abs(value: word) {
    comp.cpu.reg.A = comp.cpu.reg.A & comp.bus.readByte(value);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function and_absx(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A & comp.bus.readByte(value + comp.cpu.reg.X);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function and_absy(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A & comp.bus.readByte(value + comp.cpu.reg.Y);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function and_indx(value: byte) {
    const addr = comp.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.A = comp.cpu.reg.A & comp.bus.readByte(addr);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function and_indy(value: byte) {
    const addr = comp.bus.readByte(value) + comp.cpu.reg.Y;
    comp.cpu.reg.A = comp.cpu.reg.A & comp.bus.readByte(addr);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}



export function bit_zpg(value: word) {
    const memval = comp.bus.readByte(value);

    comp.cpu.reg.Z = (comp.cpu.reg.A & memval) === 0;
    comp.cpu.reg.V = (memval & 0b01000000) > 0;
    comp.cpu.reg.N = (memval & 0b10000000) > 0;
}

export function bit_abs(value: word) {
    const memval = comp.bus.readByte(value);

    comp.cpu.reg.Z = (comp.cpu.reg.A & memval) === 0;
    comp.cpu.reg.V = (memval & 0b01000000) > 0;
    comp.cpu.reg.N = (memval & 0b10000000) > 0;
}



export function ora_im(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A | value;

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ora_zpg(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A | comp.bus.readByte(value);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ora_zpgx(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A | comp.bus.readByte(value + comp.cpu.reg.X);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ora_abs(value: word) {
    comp.cpu.reg.A = comp.cpu.reg.A | comp.bus.readByte(value);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ora_absx(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A | comp.bus.readByte(value + comp.cpu.reg.X);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ora_absy(value: byte) {
    comp.cpu.reg.A = comp.cpu.reg.A | comp.bus.readByte(value + comp.cpu.reg.Y);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ora_indx(value: byte) {
    const addr = comp.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.A = comp.cpu.reg.A | comp.bus.readByte(addr);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function ora_indy(value: byte) {
    const addr = comp.bus.readByte(value) + comp.cpu.reg.Y;
    comp.cpu.reg.A = comp.cpu.reg.A | comp.bus.readByte(addr);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}



export function eor_im(value: byte) {
    comp.cpu.reg.A ^= value;

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function eor_zpg(value: byte) {
    comp.cpu.reg.A ^= comp.bus.readByte(value);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function eor_zpgx(value: byte) {
    comp.cpu.reg.A ^= comp.bus.readByte(value + comp.cpu.reg.X);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function eor_abs(value: word) {
    comp.cpu.reg.A ^= comp.bus.readByte(value);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function eor_absx(value: byte) {
    comp.cpu.reg.A ^= comp.bus.readByte(value + comp.cpu.reg.X);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function eor_absy(value: byte) {
    comp.cpu.reg.A ^= comp.bus.readByte(value + comp.cpu.reg.Y);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function eor_indx(value: byte) {
    const addr = comp.bus.readByte(value + comp.cpu.reg.X);
    comp.cpu.reg.A ^= comp.bus.readByte(addr);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}

export function eor_indy(value: byte) {
    const addr = comp.bus.readByte(value) + comp.cpu.reg.Y;
    comp.cpu.reg.A ^= comp.bus.readByte(addr);

    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = (comp.cpu.reg.A & 0x80) > 0;
}