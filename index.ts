import CPU from "./src/CPU.ts";
import Memory from "./src/Memory.ts";
import Registers from "./src/Registers.ts";

const ram = new Memory();
await ram.loadProgram('rom.bin');

const state = new Registers();

const cpu = new CPU(ram, state);
cpu.reset();
cpu.setSpeed(3);
cpu.run();