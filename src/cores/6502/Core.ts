import AbstractCore from "../../AbstractCore.ts";
import { AddrMode, to_addr, to_hex } from "../../utils.ts";
import * as Arith from "../Arith.ts";
import * as Branch from "../Branch.ts";
import * as Ctrl from "../Ctrl.ts";
import * as Flags from "../Flags.ts";
import * as Inc from "../Inc.ts";
import * as Load from "../Load.ts";
import * as Logic from "../Logic.ts";
import * as Shift from "../Shift.ts";
import * as Stack from "../Stack.ts";
import * as Trans from "../Trans.ts";
import { Opcodes } from "./Opcodes.ts";

class Core extends AbstractCore {
  protected log: string = '';

  public tick() {
    this.bus.instruction = this.cpu.fetchByte();
    this.log = to_addr(this.reg.PC - 1) + ' ' + to_hex(this.bus.instruction) + ' ';

    const info = Opcodes[this.bus.instruction];
    if (typeof info === 'undefined') {
      console.log(`Encountered unknown instruction: ${to_hex(this.bus.instruction)}`);
      Deno.exit();
    }

    let value = 0x00;
    switch (info[1]) {
      case AddrMode.A:
      case AddrMode.Impl:
        this.log += '       ';
        value = 0x00;
        break;

      case AddrMode.Abs:
      case AddrMode.AbsX:
      case AddrMode.AbsY:
      case AddrMode.Ind:
        value = this.cpu.fetchWord();
        this.log += `${to_hex(value)}  `;
        break;

      case AddrMode.Imm:
      case AddrMode.IndX:
      case AddrMode.IndY:
      case AddrMode.Rel:
      case AddrMode.Zpg:
      case AddrMode.ZpgX:
      case AddrMode.ZpgY:
        value = this.cpu.fetchByte();
        this.log += `${to_hex(value)}     `;
        break;
    }

    this.log += `${info[0]} `;

    switch (info[1]) {
      case AddrMode.A: this.log += 'A         '; break;
      case AddrMode.Impl: this.log += '          '; break;
      case AddrMode.Abs: this.log += `$${to_addr(value)}     `; break;
      case AddrMode.AbsX: this.log += `$${to_addr(value)},X   `; break;
      case AddrMode.AbsY: this.log += `$${to_addr(value)},Y   `; break;
      case AddrMode.Ind: this.log += `($${to_addr(value)})  `; break;
      case AddrMode.Imm: this.log += `#$${to_hex(value)}      `; break;
      case AddrMode.IndX: this.log += `($${to_hex(value)},X)   `; break;
      case AddrMode.IndY: this.log += `($${to_hex(value)} ),Y  `; break;
      case AddrMode.Rel: this.log += `$${to_hex(value)}       `; break;
      case AddrMode.Zpg: this.log += `$${to_hex(value)}       `; break;
      case AddrMode.ZpgX: this.log += `$${to_hex(value)},X     `; break;
      case AddrMode.ZpgY: this.log += `$${to_hex(value)},Y     `; break;
    }

    this.log += '|';

    switch (this.bus.instruction) {
      case 0xEA: this.nop(); break;

      /**
       * Load
       */
      case 0xA9: Load.lda_im(value); break;
      case 0xAD: Load.lda_abs(value); break;
      case 0xBD: Load.lda_absx(value); break;
      case 0xB9: Load.lda_absy(value); break;
      case 0xA5: Load.lda_zpg(value); break;
      case 0xB5: Load.lda_zpgx(value); break;
      case 0xA1: Load.lda_indx(value); break;
      case 0xB1: Load.lda_indy(value); break;

      case 0xA2: Load.ldx_im(value); break;
      case 0xAE: Load.ldx_abs(value); break;
      case 0xBE: Load.ldx_absy(value); break;
      case 0xA6: Load.ldx_zpg(value); break;
      case 0xB6: Load.ldx_zpgy(value); break;

      case 0xA0: Load.ldy_im(value); break;
      case 0xAC: Load.ldy_abs(value); break;
      case 0xBC: Load.ldy_absx(value); break;
      case 0xA4: Load.ldy_zpg(value); break;
      case 0xB4: Load.ldy_zpgx(value); break;

      case 0x8D: Load.sta_abs(value); break;
      case 0x9D: Load.sta_absx(value); break;
      case 0x99: Load.sta_absy(value); break;
      case 0x85: Load.sta_zpg(value); break;
      case 0x95: Load.sta_zpgx(value); break;
      case 0x81: Load.sta_indx(value); break;
      case 0x91: Load.sta_indy(value); break;

      case 0x8E: Load.stx_abs(value); break;
      case 0x86: Load.stx_zpg(value); break;
      case 0x96: Load.stx_zpgy(value); break;

      case 0x8C: Load.sty_abs(value); break;
      case 0x84: Load.sty_zpg(value); break;
      case 0x94: Load.sty_zpgx(value); break;

      /**
       * Transfer
       */
      case 0xAA: Trans.tax(); break;
      case 0xA8: Trans.tay(); break;
      case 0xBA: Trans.tsx(); break;
      case 0x8A: Trans.txa(); break;
      case 0x9A: Trans.txs(); break;
      case 0x98: Trans.tya(); break;

      /**
       * Stack
       */
      case 0x48: Stack.pha(); break;
      case 0x08: Stack.php(); break;
      case 0x68: Stack.pla(); break;
      case 0x28: Stack.plp(); break;

      /**
       * Shift
       */
      case 0x0A: Shift.asl_a(); break;
      case 0x0E: Shift.asl_abs(value); break;
      case 0x1E: Shift.asl_absx(value); break;
      case 0x06: Shift.asl_zpg(value); break;
      case 0x16: Shift.asl_zpgx(value); break;

      case 0x4A: Shift.lsr_a(); break;
      case 0x4E: Shift.lsr_abs(value); break;
      case 0x5E: Shift.lsr_absx(value); break;
      case 0x46: Shift.lsr_zpg(value); break;
      case 0x56: Shift.lsr_zpgx(value); break;

      case 0x2A: Shift.rol_a(); break;
      case 0x2E: Shift.rol_abs(value); break;
      case 0x3E: Shift.rol_absx(value); break;
      case 0x26: Shift.rol_zpg(value); break;
      case 0x36: Shift.rol_zpgx(value); break;

      case 0x6A: Shift.ror_a(); break;
      case 0x6E: Shift.ror_abs(value); break;
      case 0x7E: Shift.ror_absx(value); break;
      case 0x66: Shift.ror_zpg(value); break;
      case 0x76: Shift.ror_zpgx(value); break;

      /**
       * Logic
       */
      case 0x29: Logic.and_im(value); break;
      case 0x25: Logic.and_zpg(value); break;
      case 0x35: Logic.and_zpgx(value); break;
      case 0x2D: Logic.and_abs(value); break;
      case 0x3D: Logic.and_absx(value); break;
      case 0x39: Logic.and_absy(value); break;
      case 0x21: Logic.and_indx(value); break;
      case 0x31: Logic.and_indy(value); break;

      case 0x24: Logic.bit_zpg(value); break;
      case 0x2C: Logic.bit_abs(value); break;

      case 0x09: Logic.ora_im(value); break;
      case 0x05: Logic.ora_zpg(value); break;
      case 0x15: Logic.ora_zpgx(value); break;
      case 0x0D: Logic.ora_abs(value); break;
      case 0x1D: Logic.ora_absx(value); break;
      case 0x19: Logic.ora_absy(value); break;
      case 0x01: Logic.ora_indx(value); break;
      case 0x11: Logic.ora_indy(value); break;

      case 0x49: Logic.eor_im(value); break;
      case 0x45: Logic.eor_zpg(value); break;
      case 0x55: Logic.eor_zpgx(value); break;
      case 0x4D: Logic.eor_abs(value); break;
      case 0x5D: Logic.eor_absx(value); break;
      case 0x59: Logic.eor_absy(value); break;
      case 0x41: Logic.eor_indx(value); break;
      case 0x51: Logic.eor_indy(value); break;

      /**
       * Arithmetic
       */
      case 0x69: Arith.adc_im(value); break;
      case 0x65: Arith.adc_zpg(value); break;
      case 0x75: Arith.adc_zpgx(value); break;
      case 0x6D: Arith.adc_abs(value); break;
      case 0x7D: Arith.adc_absx(value); break;
      case 0x79: Arith.adc_absy(value); break;
      case 0x61: Arith.adc_indx(value); break;
      case 0x71: Arith.adc_indy(value); break;

      case 0xC9: Arith.cmp_im(value); break;
      case 0xC5: Arith.cmp_zpg(value); break;
      case 0xD5: Arith.cmp_zpgx(value); break;
      case 0xCD: Arith.cmp_abs(value); break;
      case 0xDD: Arith.cmp_absx(value); break;
      case 0xD9: Arith.cmp_absy(value); break;
      case 0xC1: Arith.cmp_indx(value); break;
      case 0xD1: Arith.cmp_indy(value); break;

      case 0xE0: Arith.cpx_im(value); break;
      case 0xE4: Arith.cpx_zpg(value); break;
      case 0xEC: Arith.cpx_abs(value); break;

      case 0xC0: Arith.cpy_im(value); break;
      case 0xC4: Arith.cpy_zpg(value); break;
      case 0xCC: Arith.cpy_abs(value); break;

      case 0xE9: Arith.sbc_im(value); break;
      case 0xED: Arith.sbc_abs(value); break;
      case 0xFD: Arith.sbc_absx(value); break;
      case 0xF9: Arith.sbc_absy(value); break;
      case 0xE5: Arith.sbc_zpg(value); break;
      case 0xF5: Arith.sbc_zpgx(value); break;
      case 0xE1: Arith.sbc_indx(value); break;
      case 0xF1: Arith.sbc_indy(value); break;

      /**
       * Increment/Decrement
       */
      case 0xCE: Inc.dec_abs(value); break;
      case 0xDE: Inc.dec_absx(value); break;
      case 0xC6: Inc.dec_zpg(value); break;
      case 0xD6: Inc.dec_zpgx(value); break;

      case 0xCA: Inc.dex(); break;
      case 0x88: Inc.dey(); break;

      case 0xEE: Inc.inc_abs(value); break;
      case 0xFE: Inc.inc_absx(value); break;
      case 0xE6: Inc.inc_zpg(value); break;
      case 0xF6: Inc.inc_zpgx(value); break;

      case 0xE8: Inc.inx(); break;
      case 0xC8: Inc.iny(); break;

      /**
       * Control
       */
      case 0x00: Ctrl.brk(); break;
      case 0x4C: Ctrl.jmp_abs(value); break;
      case 0x6C: Ctrl.jmp_ind(value); break;
      case 0x20: Ctrl.jsr_abs(value); break;
      case 0x40: Ctrl.rti(); break;
      case 0x60: Ctrl.rts(); break;

      /**
       * Branch
       */
      case 0x90: Branch.bcc(value); break;
      case 0xB0: Branch.bcs(value); break;
      case 0xF0: Branch.beq(value); break;
      case 0x30: Branch.bmi(value); break;
      case 0xD0: Branch.bne(value); break;
      case 0x10: Branch.bpl(value); break;
      case 0x50: Branch.bvc(value); break;
      case 0x70: Branch.bvs(value); break;

      /**
       * Flags
       */
      case 0x18: Flags.clc(); break;
      case 0xD8: Flags.cld(); break;
      case 0x58: Flags.cli(); break;
      case 0xB8: Flags.clv(); break;
      case 0x38: Flags.sec(); break;
      case 0xF8: Flags.sed(); break;
      case 0x78: Flags.sei(); break;
      

      default:
        console.log(`Encountered unsupported opcode: ${Opcodes[this.bus.instruction]}`);
        console.log(this.log);
        Deno.exit();
    }

    this.log += to_hex(this.reg.A);
    this.log += ' ' + to_hex(this.reg.X);
    this.log += ' ' + to_hex(this.reg.Y);
    this.log += ' ' + to_hex(this.reg.SP) + '|';
    this.log += (this.reg.N ? '1' : '0');
    this.log += (this.reg.V ? '1' : '0');
    this.log += (this.reg.D ? '1' : '0');
    this.log += (this.reg.I ? '1' : '0');
    this.log += (this.reg.Z ? '1' : '0');
    this.log += (this.reg.C ? '1' : '0');

    // console.log(this.log);
  }

  protected nop() { }

}

export default Core;