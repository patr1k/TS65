import CPU from "./CPU.ts";
import DataBus from "./DataBus.ts";

class Computer {
    public cpu: CPU;
    public bus: DataBus;
    protected _speed: number = 10;
    protected _debug: boolean = false;

    constructor() {
        this.bus = new DataBus();
        this.cpu = new CPU(this.bus);
    }

    public setSpeed(hz: number): void {
        this._speed = 1000 / hz;
    }

    public setDebugMode(mode: boolean) {
        this._debug = mode;
    }

    public reset(): void {
        this.bus.reset();
    }

    public run() {
        if (this._debug) {
            console.log('addr instr     disass        |AC XR YR SP|nvdizc');
            console.log('---- --------  --------------|-- -- -- --|------');
        }

        do {
            this.bus.tick();
            // await sleep(this._speed);
        } while (this.bus.instruction !== 0x00);
    }
}

const comp = new Computer();
export default comp;