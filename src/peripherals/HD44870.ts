import { byte } from "../utils.ts";

class HD44870 {
    protected _data: byte = 0x0;
    protected _e: boolean = false;
    protected _rw: boolean = false;
    protected _rs: boolean = false;

    protected _dl: number = 1;
    protected _n: number = 0;
    protected _f: number = 0;
    protected _d: number = 0;
    protected _c: number = 0;
    protected _b: number = 0;
    protected _id: number = 1;
    protected _s: number = 0;

    protected _ddram: byte[] = [];
    protected _cgram: byte[] = [];

    protected _ir: number = 0;
    protected _ac: number = 0;

    reset() {
        this._ir = 0;
        this._ac = 0;
        
        this._dl = 1;
        this._n = 0;
        this._f = 0;
        this._d = 0;
        this._c = 0;
        this._b = 0;
        this._id = 1;
        this._s = 0;

        this._ddram = Array(80).fill(0x00);
        this._cgram = Array(64).fill(0x00);
    }

    protected _lcd = [
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], 
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    ];

    protected _listener: ((lcd: string) => void)|null = null;

    setData(data: byte) {
        this._data = data & 0xFF;
    }

    setRegister(pin: boolean) {
        this._rs = pin;
    }

    setReadWrite(pin: boolean) {
        this._rw = pin;
    }

    setEnable(pin: boolean) {
        this._e = pin;
    }

    listenLCD(listener: (lcd: string) => void) {
        this._listener = listener;
    }

    get data(): byte {
        return this._data;
    }

    get busy(): boolean {
        return (this._data & 0x80) > 0;
    }
}

export default HD44870;