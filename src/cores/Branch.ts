import comp from "../Computer.ts";
import { byte, twos_cmpl } from "../utils.ts";

export function bcc(value: byte) {
    if (comp.cpu.reg.C === false) {
      comp.cpu.reg.PC += twos_cmpl(value);
    }
}

export function bcs(value: byte) {
    if (comp.cpu.reg.C === true) {
      comp.cpu.reg.PC += twos_cmpl(value);
    }
}

export function beq(value: byte) {
    if (comp.cpu.reg.Z === true) {
      comp.cpu.reg.PC += twos_cmpl(value);
    }
}

export function bmi(value: byte) {
    if (comp.cpu.reg.N === true) {
      comp.cpu.reg.PC += twos_cmpl(value);
    }
}

export function bne(value: byte) {
    if (comp.cpu.reg.Z === false) {
        comp.cpu.reg.PC += twos_cmpl(value);
    }
}

export function bpl(value: byte) {
    if (comp.cpu.reg.N === false) {
      comp.cpu.reg.PC += twos_cmpl(value);
    }
}

export function bvc(value: byte) {
    if (comp.cpu.reg.V === false) {
      comp.cpu.reg.PC += twos_cmpl(value);
    }
}

export function bvs(value: byte) {
    if (comp.cpu.reg.V === true) {
      comp.cpu.reg.PC += twos_cmpl(value);
    }
}