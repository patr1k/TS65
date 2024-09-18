import comp from "../Computer.ts";
import { word } from "../utils.ts";

export function asl_a() {
    const prev = comp.cpu.reg.A;
    comp.cpu.reg.A = (prev << 1) & 0xFF;

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function asl_abs(value: word) {
    const prev = comp.bus.readByte(value);
    const post = (prev << 1) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = post=== 0;
}

export function asl_absx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = (prev << 1) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = post=== 0;
}

export function asl_zpg(value: word) {
    const prev = comp.bus.readByte(value);
    const post = (prev << 1) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = post=== 0;
}

export function asl_zpgx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = (prev << 1) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = post=== 0;
}



export function lsr_a() {
    const prev = comp.cpu.reg.A;
    comp.cpu.reg.A = prev >> 1;

    comp.cpu.reg.C = (prev & 0x01) > 0;
    comp.cpu.reg.N = false;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function lsr_abs(value: word) {
    const prev = comp.bus.readByte(value);
    const post = prev >> 1;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x01) > 0;
    comp.cpu.reg.N = false;
    comp.cpu.reg.Z = post === 0;
}

export function lsr_absx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = prev >> 1;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x01) > 0;
    comp.cpu.reg.N = false;
    comp.cpu.reg.Z = post === 0;
}

export function lsr_zpg(value: word) {
    const prev = comp.bus.readByte(value);
    const post = prev >> 1;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x01) > 0;
    comp.cpu.reg.N = false;
    comp.cpu.reg.Z = post === 0;
}

export function lsr_zpgx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = prev >> 1;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x01) > 0;
    comp.cpu.reg.N = false;
    comp.cpu.reg.Z = post === 0;
}



export function rol_a() {
    const prev = comp.cpu.reg.A;
    comp.cpu.reg.A = ((prev << 1)|(prev >> 7)) & 0xFF;

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function rol_abs(value: word) {
    const prev = comp.bus.readByte(value);
    const post = ((prev << 1)|(prev >> 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function rol_absx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = ((prev << 1)|(prev >> 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function rol_zpg(value: word) {
    const prev = comp.bus.readByte(value);
    const post = ((prev << 1)|(prev >> 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function rol_zpgx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = ((prev << 1)|(prev >> 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}



export function ror_a() {
    const prev = comp.cpu.reg.A;
    comp.cpu.reg.A = ((prev >> 1)|(prev << 7)) & 0xFF;

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function ror_abs(value: word) {
    const prev = comp.bus.readByte(value);
    const post = ((prev >> 1)|(prev << 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function ror_absx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = ((prev >> 1)|(prev << 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function ror_zpg(value: word) {
    const prev = comp.bus.readByte(value);
    const post = ((prev >> 1)|(prev << 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}

export function ror_zpgx(value: word) {
    value += comp.cpu.reg.X;
    const prev = comp.bus.readByte(value);
    const post = ((prev >> 1)|(prev << 7)) & 0xFF;
    comp.bus.writeByte(value, post);

    comp.cpu.reg.C = (prev & 0x80) > 0;
    comp.cpu.reg.N = (prev & 0x40) > 0;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
}