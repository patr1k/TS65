import { AddrMode, InstrDef } from "../../utils.ts";

export const Opcodes: Record<number, InstrDef> = {
  0x00: ['BRK', AddrMode.Impl],
  0x01: ['ORA', AddrMode.IndX],
  0x05: ['ORA', AddrMode.Zpg],
  0x06: ['ASL', AddrMode.Zpg],
  0x08: ['PHP', AddrMode.Impl],
  0x09: ['ORA', AddrMode.Imm],
  0x0A: ['ASL', AddrMode.A],
  0x0D: ['ORA', AddrMode.Abs],
  0x0E: ['ASL', AddrMode.Abs],

  0x10: ['BPL', AddrMode.Rel],
  0x11: ['ORA', AddrMode.IndY],
  0x15: ['ORA', AddrMode.ZpgX],
  0x16: ['ASL', AddrMode.ZpgX],
  0x18: ['CLC', AddrMode.Impl],
  0x19: ['ORA', AddrMode.AbsY],
  0x1D: ['ORA', AddrMode.AbsX],
  0x1E: ['ASL', AddrMode.AbsX],

  0x20: ['JSR', AddrMode.Abs],
  0x21: ['AND', AddrMode.IndX],
  0x24: ['BIT', AddrMode.Zpg],
  0x25: ['AND', AddrMode.Zpg],
  0x26: ['ROL', AddrMode.Zpg],
  0x28: ['PLP', AddrMode.Impl],
  0x29: ['AND', AddrMode.Imm],
  0x2A: ['ROL', AddrMode.A],
  0x2C: ['BIT', AddrMode.Abs],
  0x2D: ['AND', AddrMode.Abs],
  0x2E: ['ROL', AddrMode.Abs],

  0x30: ['BMI', AddrMode.Rel],
  0x31: ['AND', AddrMode.IndY],
  0x35: ['AND', AddrMode.ZpgX],
  0x36: ['ROL', AddrMode.ZpgX],
  0x38: ['SEC', AddrMode.Impl],
  0x39: ['AND', AddrMode.AbsY],
  0x3D: ['AND', AddrMode.AbsX],
  0x3E: ['ROL', AddrMode.AbsX],

  0x40: ['RTI', AddrMode.Impl],
  0x41: ['EOR', AddrMode.IndX],
  0x45: ['EOR', AddrMode.Zpg],
  0x46: ['LSR', AddrMode.Zpg],
  0x48: ['PHA', AddrMode.Impl],
  0x49: ['EOR', AddrMode.Imm],
  0x4A: ['LSR', AddrMode.A],
  0x4C: ['JMP', AddrMode.Abs],
  0x4D: ['EOR', AddrMode.Abs],
  0x4E: ['LSR', AddrMode.Abs],

  0x50: ['BVC', AddrMode.Rel],
  0x51: ['EOR', AddrMode.IndY],
  0x55: ['EOR', AddrMode.ZpgX],
  0x56: ['LSR', AddrMode.ZpgX],
  0x58: ['CLI', AddrMode.Impl],
  0x59: ['EOR', AddrMode.AbsY],
  0x5D: ['EOR', AddrMode.AbsX],
  0x5E: ['LSR', AddrMode.AbsX],

  0x60: ['RTS', AddrMode.Impl],
  0x61: ['ADC', AddrMode.IndX],
  0x65: ['ADC', AddrMode.Zpg],
  0x66: ['ROR', AddrMode.Zpg],
  0x68: ['PLA', AddrMode.Impl],
  0x69: ['ADC', AddrMode.Imm],
  0x6A: ['ROR', AddrMode.A],
  0x6C: ['JMP', AddrMode.Ind],
  0x6D: ['ADC', AddrMode.Abs],
  0x6E: ['ROR', AddrMode.Abs],

  0x70: ['BVS', AddrMode.Rel],
  0x71: ['ADC', AddrMode.IndY],
  0x75: ['ADC', AddrMode.ZpgX],
  0x76: ['ROR', AddrMode.ZpgX],
  0x78: ['SEI', AddrMode.Impl],
  0x79: ['ADC', AddrMode.AbsY],
  0x7D: ['ADC', AddrMode.AbsX],
  0x7E: ['ROR', AddrMode.AbsX],

  0x81: ['STA', AddrMode.IndX],
  0x84: ['STY', AddrMode.Zpg],
  0x85: ['STA', AddrMode.Zpg],
  0x86: ['STX', AddrMode.Zpg],
  0x88: ['DEY', AddrMode.Impl],
  0x8A: ['TXA', AddrMode.Impl],
  0x8C: ['STY', AddrMode.Abs],
  0x8D: ['STA', AddrMode.Abs],
  0x8E: ['STX', AddrMode.Abs],

  0x90: ['BCC', AddrMode.Rel],
  0x91: ['STA', AddrMode.IndY],
  0x94: ['STY', AddrMode.ZpgX],
  0x95: ['STA', AddrMode.ZpgX],
  0x96: ['STX', AddrMode.ZpgX],
  0x98: ['TYA', AddrMode.Impl],
  0x99: ['STA', AddrMode.AbsY],
  0x9A: ['TXS', AddrMode.Impl],
  0x9D: ['STA', AddrMode.AbsX],

  0xA0: ['LDY', AddrMode.Imm],
  0xA1: ['LDA', AddrMode.IndX],
  0xA2: ['LDX', AddrMode.Imm],
  0xA4: ['LDY', AddrMode.Zpg],
  0xA5: ['LDA', AddrMode.Zpg],
  0xA6: ['LDX', AddrMode.Zpg],
  0xA8: ['TAY', AddrMode.Impl],
  0xA9: ['LDA', AddrMode.Imm],
  0xAA: ['TAX', AddrMode.Impl],
  0xAC: ['LDY', AddrMode.Abs],
  0xAD: ['LDA', AddrMode.Abs],
  0xAE: ['LDX', AddrMode.Abs],

  0xB0: ['BCS', AddrMode.Rel],
  0xB1: ['LDA', AddrMode.IndY],
  0xB4: ['LDY', AddrMode.ZpgX],
  0xB5: ['LDA', AddrMode.ZpgX],
  0xB6: ['LDX', AddrMode.ZpgY],
  0xB8: ['CLV', AddrMode.Impl],
  0xB9: ['LDA', AddrMode.AbsY],
  0xBA: ['TSX', AddrMode.Impl],
  0xBC: ['LDY', AddrMode.AbsX],
  0xBD: ['LDA', AddrMode.AbsX],
  0xBE: ['LDX', AddrMode.AbsY],

  0xC0: ['CPY', AddrMode.Imm],
  0xC1: ['CMP', AddrMode.IndX],
  0xC4: ['CPY', AddrMode.Zpg],
  0xC5: ['CMP', AddrMode.Zpg],
  0xC6: ['DEC', AddrMode.Zpg],
  0xC8: ['INY', AddrMode.Impl],
  0xC9: ['CMP', AddrMode.Imm],
  0xCA: ['DEX', AddrMode.Impl],
  0xCC: ['CPY', AddrMode.Abs],
  0xCD: ['CMP', AddrMode.Abs],
  0xCE: ['DEC', AddrMode.Abs],

  0xD0: ['BNE', AddrMode.Rel],
  0xD1: ['CMP', AddrMode.IndY],
  0xD5: ['CMP', AddrMode.ZpgX],
  0xD6: ['DEC', AddrMode.ZpgX],
  0xD8: ['CLD', AddrMode.Impl],
  0xD9: ['CMP', AddrMode.AbsY],
  0xDD: ['CMP', AddrMode.AbsX],
  0xDE: ['DEC', AddrMode.AbsX],

  0xE0: ['CPX', AddrMode.Imm],
  0xE1: ['SBC', AddrMode.IndX],
  0xE4: ['CPX', AddrMode.Zpg],
  0xE5: ['SBC', AddrMode.Zpg],
  0xE6: ['INC', AddrMode.Zpg],
  0xE8: ['INX', AddrMode.Impl],
  0xE9: ['SBC', AddrMode.Imm],
  0xEA: ['NOP', AddrMode.Impl],
  0xEC: ['CPX', AddrMode.Abs],
  0xED: ['SBC', AddrMode.Abs],
  0xEE: ['INC', AddrMode.Abs],

  0xF0: ['BEQ', AddrMode.Rel],
  0xF1: ['SBC', AddrMode.IndY],
  0xF5: ['SBC', AddrMode.ZpgX],
  0xF6: ['INC', AddrMode.ZpgX],
  0xF8: ['SED', AddrMode.Impl],
  0xF9: ['SBC', AddrMode.AbsY],
  0xFD: ['SBC', AddrMode.AbsX],
  0xFE: ['INC', AddrMode.AbsX],
};