import comp from "../Computer.ts";

export function clc() {
    comp.cpu.reg.C = false;
}

export function cld() {
    comp.cpu.reg.D = false;
}

export function cli() {
    comp.cpu.reg.I = false;
}

export function clv() {
    comp.cpu.reg.I = false;
}

export function sec() {
    comp.cpu.reg.C = true;
}

export function sed() {
    comp.cpu.reg.D = true;
}

export function sei() {
    comp.cpu.reg.I = true;
}