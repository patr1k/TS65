import comp from "../../src/Computer.ts";
import RAM from "../../src/RAM.ts";
import ROM from "../../src/ROM.ts";
import W65C22 from "../../src/peripherals/W65C22.ts";
import { byte } from "../../src/utils.ts";

const via = new W65C22();

via.listenPortA((porta: byte) => {
    if (porta & 0x1) {
        console.log('LED ON');
    } else {
        console.log('LED OFF');
    }
});

comp.bus.registerSegment(0x0000, 0x3FFF, new RAM(0x4000));
comp.bus.registerSegment(0x6000, 0x600F, via);
comp.bus.registerSegment(0x8000, 0xFFFF, new ROM(import.meta.dirname + '/blink.bin'));

comp.reset();
comp.run();