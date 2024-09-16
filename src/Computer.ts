import CPU from "./CPU.ts";
import DataBus from "./DataBus.ts";
import { sleep } from "./utils.ts";

class Computer {
    protected _cpu: CPU;
    protected _bus: DataBus;
    protected _speed: number = 10;

    constructor() {
        this._bus = new DataBus();
        this._cpu = new CPU(this._bus);
    }

    public setSpeed(hz: number): void {
        this._speed = 1000 / hz;
    }

    public reset(): void {
        this._bus.reset();
    }

    public async run() {
        console.log('addr instr     disass        |AC XR YR SP|nvdizc');
        console.log('---- --------  --------------|-- -- -- --|------')

        do {
            this._bus.tick();
            await sleep(this._speed);
        } while (this._bus.instruction !== 0x00);
    }

    get bus(): DataBus {
        return this._bus;
    }

    get cpu(): CPU {
        return this._cpu;
    }
}

export default Computer;