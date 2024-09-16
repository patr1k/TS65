# Blink Example

**Blinking LED Using Hardware Timer**

This example uses a virtual W65C22 Versatile Interface Adapter to implement a
hardware timer which turns an LED on and off.

## Memory Map

```
0x0000 - 0x3fff = RAM
0x4000 - 0x5fff = Open Bus (Invalid Memory Addresses)
0x6000 - 0x600f = Versatile Interface Adapter
0x6010 - 0x7fff = Open Bus (Invalid Memory Addresses)
0x8000 - 0xffff = ROM
```
