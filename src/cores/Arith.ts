import comp from "../Computer.ts";
import { byte } from "../utils.ts";

export function adc_im(value: byte) {
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
        comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
        comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}

export function adc_zpg(value: byte) {
    value = comp.cpu.bus.readByte(value);
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
        comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
        comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}

export function adc_zpgx(value: byte) {
    value = comp.cpu.bus.readByte(value + comp.cpu.reg.X);
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
      comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
      comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}

export function adc_abs(value: byte) {
    value = comp.cpu.bus.readByte(value);
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
      comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
      comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}

export function adc_absx(value: byte) {
    value = comp.cpu.bus.readByte(value + comp.cpu.reg.X);
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
      comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
      comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}

export function adc_absy(value: byte) {
    value = comp.cpu.bus.readByte(value + comp.cpu.reg.X);
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
      comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
      comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}

export function adc_indx(value: byte) {
    const addr = comp.cpu.bus.readByte(value + comp.cpu.reg.X);
    value = comp.cpu.bus.readByte(addr);
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
      comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
      comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}

export function adc_indy(value: byte) {
    const addr = comp.cpu.bus.readByte(value) + comp.cpu.reg.Y;
    value = comp.cpu.bus.readByte(addr);
    const result = comp.cpu.reg.A + value + (comp.cpu.reg.C ? 1 : 0);

    if (!(comp.cpu.reg.A & 0x80) && !(value & 0x80) && (result & 0x80)) {
      comp.cpu.reg.V = true;
    } else if ((comp.cpu.reg.A & 0x80) && (value & 0x80) && !(result & 0x80)) {
      comp.cpu.reg.V = true;
    }

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
    comp.cpu.reg.V = (result & 0x100) > 0;
}



export function cmp_im(value: byte) {
    const result = comp.cpu.reg.A - value;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cmp_zpg(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.A - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cmp_zpgx(value: byte) {
    const prev = comp.bus.readByte(value + comp.cpu.reg.X);
    const result = comp.cpu.reg.A - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cmp_abs(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.A - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cmp_absx(value: byte) {
    const prev = comp.bus.readByte(value + comp.cpu.reg.X);
    const result = comp.cpu.reg.A - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cmp_absy(value: byte) {
    const prev = comp.bus.readByte(value + comp.cpu.reg.Y);
    const result = comp.cpu.reg.A - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cmp_indx(value: byte) {
    const addr = comp.bus.readByte(value + comp.cpu.reg.X);
    const prev = comp.bus.readByte(addr);
    const result = comp.cpu.reg.A - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cmp_indy(value: byte) {
    const addr = comp.bus.readByte(value) + comp.cpu.reg.X;
    const prev = comp.bus.readByte(addr);
    const result = comp.cpu.reg.A - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}



export function cpx_im(value: byte) {
    const result = comp.cpu.reg.X - value;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cpx_zpg(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.X - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cpx_abs(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.X - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}



export function cpy_im(value: byte) {
    const result = comp.cpu.reg.Y - value;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cpy_zpg(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.Y - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}

export function cpy_abs(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.Y - prev;

    comp.cpu.reg.C = result > 0;
    comp.cpu.reg.Z = result === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
}



export function sbc_im(value: byte) {
    const result = comp.cpu.reg.A - value - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}

export function sbc_abs(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.A - prev - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}

export function sbc_absx(value: byte) {
    const prev = comp.bus.readByte(value + comp.cpu.reg.X);
    const result = comp.cpu.reg.A - prev - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}

export function sbc_absy(value: byte) {
    const prev = comp.bus.readByte(value + comp.cpu.reg.Y);
    const result = comp.cpu.reg.A - prev - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}

export function sbc_zpg(value: byte) {
    const prev = comp.bus.readByte(value);
    const result = comp.cpu.reg.A - prev - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}

export function sbc_zpgx(value: byte) {
    const prev = comp.bus.readByte(value + comp.cpu.reg.X);
    const result = comp.cpu.reg.A - prev - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((prev && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}

export function sbc_indx(value: byte) {
    const addr = comp.cpu.bus.readByte(value + comp.cpu.reg.X);
    value = comp.bus.readByte(addr);
    const result = comp.cpu.reg.A - value - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}

export function sbc_indy(value: byte) {
    const addr = comp.cpu.bus.readByte(value) + comp.cpu.reg.Y;
    value = comp.bus.readByte(addr);
    const result = comp.cpu.reg.A - value - (1 - (comp.cpu.reg.C ? 1 : 0));

    comp.cpu.reg.A = result & 0xFF;
    comp.cpu.reg.Z = comp.cpu.reg.A === 0;
    comp.cpu.reg.N = ((value && 0x80) === 0) && ((result & 0x80) > 0);
    comp.cpu.reg.C = (result & 0x100) > 0;
}