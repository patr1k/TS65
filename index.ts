import CPU from "./src/CPU.ts";
import VIA from "./src/peripherals/W65C22.ts";
import MemoryController from "./src/MemoryController.ts";
import RAM from "./src/RAM.ts";
import ROM from "./src/ROM.ts";
import Registers from "./src/Registers.ts";

const memory = new MemoryController();
memory.registerSegment(0x0000, 0x3FFF, new RAM(0x4000));
memory.registerSegment(0x6000, 0x600F, new VIA());
memory.registerSegment(0x8000, 0xFFFF, new ROM('rom.bin'));

const state = new Registers();

const cpu = new CPU(memory, state);
cpu.reset();
cpu.setSpeed(3);
cpu.run();