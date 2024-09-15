export type byte = number;
export type word = number;
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
export function twos_cmpl(num: number): number {
    let ans = (num & 0x80) * -1;
    for (let i = 6; i >= 0; i--) {
        ans += num & (0x1 << i);
    }
    return ans;
};
export function to_hex(num: number): string {
    if (num === 0) {
        return '00';
    }

    const str = num.toString(16);
    if (str.length === 1) {
        return '0' + str.toUpperCase();
    }
    if (str.length === 3) {
        return str.substring(1).toUpperCase() + ' 0' + str.substring(0, 1).toUpperCase();
    }
    if (str.length === 4) {
        return str.substring(2).toUpperCase() + ' ' + str.substring(0, 2).toUpperCase();
    }
    return str.toUpperCase();
};
export function to_addr(num: number): string {
    if (num === 0) {
        return '0000';
    }

    const str = num.toString(16).toUpperCase();
    if (str.length === 1) {
        return '000' + str;
    }
    if (str.length === 2) {
        return '00' + str;
    }
    if (str.length === 3) {
        return '0' + str;
    }
    return str;
};
export enum AddrMode {
    A = 1,
    Abs = 2,
    AbsX = 3,
    AbsY = 4,
    Imm = 5,
    Impl = 6,
    Ind = 7,
    IndX = 8,
    IndY = 9,
    Rel = 10,
    Zpg = 11,
    ZpgX = 12,
    ZpgY = 13,
}
export type InstrDef = [string, AddrMode];