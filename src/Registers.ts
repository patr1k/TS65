import { H, HL, L, byte, word } from "./utils.ts";

class Registers {
    A: byte     = 0;  // Accumulator
    P: byte     = 0;  // Status Flags Register
    PCL: byte   = 0;  // Program Counter (low)
    PCH: byte   = 0;  // Program Counter (high)
    SP: byte    = 0;  // Stack Pointer
    X: byte     = 0;  // Index Register X
    Y: byte     = 0;  // Index Register Y

    static FLAG_NEGATIVE    = 0b10000000;
    static FLAG_OVERFLOW    = 0b01000000;
    static FLAG_UNUSED      = 0b00100000;
    static FLAG_BREAK       = 0b00010000;
    static FLAG_DECIMAL     = 0b00001000;
    static FLAG_IRQ_DISABLE = 0b00000100;
    static FLAG_ZERO        = 0b00000010;
    static FLAG_CARRY       = 0b00000001;

    constructor() {
        this.reset();
    }

    reset() {
        this.A = 0;
        this.P = 0b00110110;
        this.P = Registers.FLAG_BREAK | Registers.FLAG_IRQ_DISABLE | Registers.FLAG_ZERO | Registers.FLAG_BREAK;
        this.PCL = 0;
        this.PCH = 0;
        this.SP = 0xFF;
        this.X = 0;
        this.Y = 0;
    }

    get PC(): word {
        return HL(this.PCH, this.PCL);
    }

    set PC(val: word) {
        this.PCL = L(val);
        this.PCH = H(val);
    }

    get N(): boolean {
        return Boolean(this.P & Registers.FLAG_NEGATIVE);
    }

    set N(val: boolean) {
        if (val) {
            this.P |= Registers.FLAG_NEGATIVE;
        } else {
            this.P &= ~Registers.FLAG_NEGATIVE;
        }
    }

    get V(): boolean {
        return Boolean(this.P & Registers.FLAG_OVERFLOW);
    }

    set V(val: boolean) {
        if (val) {
            this.P |= Registers.FLAG_OVERFLOW;
        } else {
            this.P &= ~Registers.FLAG_OVERFLOW;
        }
    }

    get B(): boolean {
        return Boolean(this.P & Registers.FLAG_BREAK);
    }

    set B(val: boolean) {
        if (val) {
            this.P |= Registers.FLAG_BREAK;
        } else {
            this.P &= ~Registers.FLAG_BREAK;
        }
    }

    get D(): boolean {
        return Boolean(this.P & Registers.FLAG_DECIMAL);
    }

    set D(val: boolean) {
        if (val) {
            this.P |= Registers.FLAG_DECIMAL;
        } else {
            this.P &= ~Registers.FLAG_DECIMAL;
        }
    }

    get I(): boolean {
        return Boolean(this.P & Registers.FLAG_IRQ_DISABLE);
    }

    set I(val: boolean) {
        if (val) {
            this.P |= Registers.FLAG_IRQ_DISABLE;
        } else {
            this.P &= ~Registers.FLAG_IRQ_DISABLE;
        }
    }

    get Z(): boolean {
        return Boolean(this.P & Registers.FLAG_ZERO);
    }

    set Z(val: boolean) {
        if (val) {
            this.P |= Registers.FLAG_ZERO;
        } else {
            this.P &= ~Registers.FLAG_ZERO;
        }
    }

    get C(): boolean {
        return Boolean(this.P & Registers.FLAG_CARRY);
    }

    set C(val: boolean) {
        if (val) {
            this.P |= Registers.FLAG_CARRY;
        } else {
            this.P &= ~Registers.FLAG_CARRY;
        }
    }
}

export default Registers;