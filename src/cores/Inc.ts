import comp from "../Computer.ts";
import { byte } from "../utils.ts";

export function dec_abs(value: byte) {
    const prev = comp.bus.readByte(value);
    const memval = (prev - 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function dec_absx(value: byte) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const memval = (prev - 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function dec_zpg(value: byte) {
    const prev = comp.bus.readByte(value);
    const memval = (prev - 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function dec_zpgx(value: byte) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const memval = (prev - 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function dex() {
    const prev = comp.cpu.reg.X;
    comp.cpu.reg.X = (prev - 1) & 0xFF;

    comp.cpu.reg.Z = comp.cpu.reg.X === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((comp.cpu.reg.X & 0x80) > 0);
}

export function dey() {
    const prev = comp.cpu.reg.Y;
    comp.cpu.reg.Y = (prev - 1) & 0xFF;

    comp.cpu.reg.Z = comp.cpu.reg.Y === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((comp.cpu.reg.Y & 0x80) > 0);
}

export function inc_abs(value: byte) {
    const prev = comp.bus.readByte(value);
    const memval = (prev + 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function inc_absx(value: byte) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const memval = (prev + 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function inc_zpg(value: byte) {
    const prev = comp.bus.readByte(value);
    const memval = (prev + 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function inc_zpgx(value: byte) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const memval = (prev + 1) & 0xFF;
    comp.bus.writeByte(value, memval);

    comp.cpu.reg.Z = memval === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((memval & 0x80) > 0);
}

export function inx() {
    const prev = comp.cpu.reg.X;
    comp.cpu.reg.X = (prev + 1) & 0xFF;

    comp.cpu.reg.Z = comp.cpu.reg.X === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((comp.cpu.reg.X & 0x80) > 0);
}

export function iny() {
    const prev = comp.cpu.reg.Y;
    comp.cpu.reg.Y = (prev + 1) & 0xFF;

    comp.cpu.reg.Z = comp.cpu.reg.Y === 0;
    comp.cpu.reg.N = ((prev & 0x80) === 0) && ((comp.cpu.reg.Y & 0x80) > 0);
}