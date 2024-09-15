PORTB = $6000
PORTA = $6001
DDRB  = $6002
DDRA  = $6003
T1CL = $6004
T1CH = $6005
ACR = $600B
IFR = $600D ; interrupt flag register
IER = $600E ; interrupt enable register

ticks = $00
toggle_time = $04

E  = %10000000      ; enable (toggle on/off to trigger read/write)
RW = %01000000      ; read/write (0 = write, 1 = read)
RS = %00100000      ; register select (0 = instruction, 1 = data)

  .org $8000        ; CPU needs to think our program starts at 0x8000 (even tho it's really at 0x00)
reset:
  lda #%11111111    ; set first 3 pins on PORTA to output
  sta DDRA
  lda #0
  sta PORTA
  sta toggle_time
  jsr init_timer

loop:
  sec               ; set carry bit
  lda ticks         ; load ticks into A
  sbc toggle_time   ; subtract toggle_time from A
  cmp #25           ; compare A with 25 (have 250ms elapsed?)
  bcc loop          ; branch if carry clear
  lda #$01          ; load 1 into A
  eor PORTA         ; XOR PORTA with 1 (storing result in A)
  sta PORTA         ; toggle LED
  lda ticks
  sta toggle_time
  jmp loop

init_timer:
  lda #0
  sta ticks
  sta ticks + 1
  sta ticks + 2
  sta ticks + 3
  lda #%01000000
  sta ACR
  lda #$0e
  sta T1CL
  lda #$27
  sta T1CH
  lda #%11000000
  sta IER
  cli
  rts

irq:
  bit T1CL
  inc ticks
  bne end_irq
  inc ticks + 1
  bne end_irq
  inc ticks + 2
  bne end_irq
  inc ticks + 3
end_irq:
  rti 

  .org $fffc        ; move to the end of the EEPROM
  .word reset       ; reset vector
  .word irq         ; interrupt vector
