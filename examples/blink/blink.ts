import Computer from "../../src/Computer.ts";
import RAM from "../../src/RAM.ts";
import ROM from "../../src/ROM.ts";
import W65C22 from "../../src/peripherals/W65C22.ts";

const computer = new Computer();

computer.bus.registerSegment(0x0000, 0x3FFF, new RAM(0x4000));
computer.bus.registerSegment(0x6000, 0x600F, new W65C22());
computer.bus.registerSegment(0x8000, 0xFFFF, new ROM(import.meta.dirname + '/blink.bin'));

computer.reset();
computer.setSpeed(1000);
computer.run();