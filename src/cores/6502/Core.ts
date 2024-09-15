import AbstractCore from "../../AbstractCore.ts";
import { AddrMode, byte, to_addr, to_hex, twos_cmpl, word } from "../../types.ts";
import { Opcodes } from "./Opcodes.ts";

class Core extends AbstractCore {
  protected log: string = '';

  public execute(instr: byte) {
    this.log = to_addr(this.reg.PC - 1) + ' ' + to_hex(instr) + ' ';

    const info = Opcodes[instr];
    if (typeof info === 'undefined') {
      console.log(`Encountered unknown instruction: ${to_hex(instr)}`);
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

    switch (instr) {
      case 0x00: this.brk(); break;

      case 0x29: this.and_im(value); break;
      case 0x25: this.and_zpg(value); break;
      case 0x35: this.and_zpgx(value); break;
      case 0x2D: this.and_abs(value); break;
      case 0x3D: this.and_absx(value); break;
      case 0x39: this.and_absy(value); break;
      case 0x21: this.and_indx(value); break;
      case 0x31: this.and_indy(value); break;

      case 0x09: this.ora_im(value); break;
      case 0x05: this.ora_zpg(value); break;
      case 0x15: this.ora_zpgx(value); break;
      case 0x0D: this.ora_abs(value); break;
      case 0x1D: this.ora_absx(value); break;
      case 0x19: this.ora_absy(value); break;
      case 0x01: this.ora_indx(value); break;
      case 0x11: this.ora_indy(value); break;

      case 0x49: this.eor_im(value); break;
      case 0x45: this.eor_zpg(value); break;
      case 0x55: this.eor_zpgx(value); break;
      case 0x4D: this.eor_abs(value); break;
      case 0x5D: this.eor_absx(value); break;
      case 0x59: this.eor_absy(value); break;
      case 0x41: this.eor_indx(value); break;
      case 0x51: this.eor_indy(value); break;

      case 0xA9: this.lda_im(value); break;
      case 0x8D: this.sta_abs(value); break;
      case 0x85: this.sta_zpg(value); break;
      case 0x20: this.jsr_abs(value); break;
      case 0x38: this.sec(); break;
      case 0xA5: this.lda_zpg(value); break;
      case 0xE5: this.sbc_zpg(value); break;
      case 0xC9: this.cmp_im(value); break;
      case 0x90: this.bcc(value); break;
      case 0x58: this.cli(); break;
      case 0x60: this.rts(); break;
      case 0x2C: this.bit_abs(value); break;
      case 0xE6: this.inc_zpg(value); break;
      case 0xD0: this.bne(value); break;
      case 0x40: this.rti(); break;
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

    console.log(this.log);
  }

  protected brk() {

  }

  protected and_im(value: byte) {
    this.reg.A = this.reg.A & value;

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected and_zpg(value: byte) {
    this.reg.A = this.reg.A & this.mem.readByte(value);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected and_zpgx(value: byte) {
    this.reg.A = this.reg.A & this.mem.readByte(value + this.reg.X);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected and_abs(value: word) {
    this.reg.A = this.reg.A & this.mem.readByte(value);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected and_absx(value: byte) {
    this.reg.A = this.reg.A & this.mem.readByte(value + this.reg.X);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected and_absy(value: byte) {
    this.reg.A = this.reg.A & this.mem.readByte(value + this.reg.Y);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected and_indx(value: byte) {
    const addr = this.mem.readByte(value + this.reg.X);
    this.reg.A = this.reg.A & this.mem.readByte(addr);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected and_indy(value: byte) {
    const addr = this.mem.readByte(value) + this.reg.Y;
    this.reg.A = this.reg.A & this.mem.readByte(addr);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }



  protected ora_im(value: byte) {
    this.reg.A = this.reg.A | value;

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected ora_zpg(value: byte) {
    this.reg.A = this.reg.A | this.mem.readByte(value);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected ora_zpgx(value: byte) {
    this.reg.A = this.reg.A | this.mem.readByte(value + this.reg.X);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected ora_abs(value: word) {
    this.reg.A = this.reg.A | this.mem.readByte(value);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected ora_absx(value: byte) {
    this.reg.A = this.reg.A | this.mem.readByte(value + this.reg.X);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected ora_absy(value: byte) {
    this.reg.A = this.reg.A | this.mem.readByte(value + this.reg.Y);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected ora_indx(value: byte) {
    const addr = this.mem.readByte(value + this.reg.X);
    this.reg.A = this.reg.A | this.mem.readByte(addr);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected ora_indy(value: byte) {
    const addr = this.mem.readByte(value) + this.reg.Y;
    this.reg.A = this.reg.A | this.mem.readByte(addr);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }



  protected eor_im(value: byte) {
    this.reg.A = this.reg.A ^ value;

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected eor_zpg(value: byte) {
    this.reg.A = this.reg.A ^ this.mem.readByte(value);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected eor_zpgx(value: byte) {
    this.reg.A = this.reg.A ^ this.mem.readByte(value + this.reg.X);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected eor_abs(value: word) {
    this.reg.A = this.reg.A ^ this.mem.readByte(value);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected eor_absx(value: byte) {
    this.reg.A = this.reg.A ^ this.mem.readByte(value + this.reg.X);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected eor_absy(value: byte) {
    this.reg.A = this.reg.A ^ this.mem.readByte(value + this.reg.Y);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected eor_indx(value: byte) {
    const addr = this.mem.readByte(value + this.reg.X);
    this.reg.A = this.reg.A ^ this.mem.readByte(addr);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected eor_indy(value: byte) {
    const addr = this.mem.readByte(value) + this.reg.Y;
    this.reg.A = this.reg.A ^ this.mem.readByte(addr);

    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }



  protected lda_im(value: byte) {
    this.reg.A = value;
    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected sta_abs(value: word) {
    this.mem.writeWord(this.reg.A, value);
  }

  protected sta_zpg(value: byte) {
    this.mem.writeWord(this.reg.A, value);
  }

  protected jsr_abs(value: word) {
    this.cpu.pushWord(this.reg.PC);
    this.reg.PC = value;
  }

  protected sec() {
    this.reg.C = true;
  }

  protected lda_zpg(value: byte) {
    this.reg.A = this.mem.readByte(value);
    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
  }

  protected sbc_zpg(value: byte) {
    const result = this.reg.A - this.mem.readByte(value) - (1 - (this.reg.C ? 1 : 0));

    this.reg.A = result & 0xFF;
    this.reg.Z = this.reg.A === 0;
    this.reg.N = (this.reg.A & 0x80) > 0;
    this.reg.C = (result & 0x100) > 0;
  }

  protected cmp_im(value: byte) {
    const result = this.reg.A - value;

    this.reg.C = result > 0;
    this.reg.Z = result === 0;
    this.reg.N = (result & 0x80) > 0;
  }

  protected bcc(value: byte) {
    if (this.reg.C === false) {
      this.reg.PC += twos_cmpl(value);
    }
  }

  protected cli() {
    this.reg.I = false;
  }

  protected rts() {
    this.reg.PC = this.cpu.pullWord();
  }

  protected bit_abs(value: word) {
    const memval = this.mem.readByte(value);

    this.reg.Z = (this.reg.A & memval) === 0;
    this.reg.V = (memval & 0b01000000) > 0;
    this.reg.N = (memval & 0b10000000) > 0;
  }

  protected inc_zpg(value: byte) {
    const memval = (this.mem.readByte(value) + 1) & 0xFF;

    this.reg.Z = memval === 0;
    this.reg.N = (memval & 0x80) > 0;
  }

  protected bne(value: byte) {
    if (this.reg.Z === false) {
      this.reg.PC += twos_cmpl(value);
    }
  }

  protected rti() {
    this.reg.P = this.cpu.pullByte();
    this.reg.PC = this.cpu.pullWord();
  }
}

export default Core;