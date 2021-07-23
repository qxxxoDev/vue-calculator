<template>
  <div class="container">
    <div class="result">
      <input readonly id="screen" type="text" :value="screen">
    </div>
    <div class="grid">
      <button class="btn"
        v-for="cell of cells"
        :aria-label="`${cell.class}: ${cell.content}`"
        :key="cell.content"
        :class="cell.class"
        @click="execute(cell)">
        {{ cell.content }}
      </button>
    </div>
  </div>
</template>

<script>
import cells from './cells'

const DIGIT = 'digit'
const OPERAND = 'operand'
const GET = 'equal'
const CLEAR_ALL = 'action clearAll'
const CLEAR_LAST = 'action clearLast'
const LINK = 'action link'
const COMA = 'coma'

const OPERANDS = ['+', '-', '/', '*']
const GITHUB_LINK = 'https://github.com/qxxxoDev'
const OPERANDS_REGEX = /[\+\-\/\*]/gm

export default {
  data(){
    return {
      cells,
      input: '0',
      screen: '0',
      forbidSymbols: false
    }
  },
  computed: {
    lastChar(){
      return this.input.slice(-1)
    },
    numberBeforeLastOperandIsUsed(){
      const numbers = this.input.split(OPERANDS_REGEX)
      return numbers[numbers.length - 1]
    }
  },
  watch: {
    input(){
      if (this.input.includes('NaN') || this.input.includes('Error')){
        this.input = '0'
      }
      this.cells[0].content = this.input != '0' ? 'C' : 'AC'

      if (this.screen.includes('=')){
        this.cells[0].content = 'C'
      }
    }
  },
  methods: {
    execute(cell){
      const type = cell.class
      const value = type == DIGIT ? cell.content : cell.parsed

      switch (type) {
        case DIGIT:
          this.insertDigit(value)
          break
        case OPERAND:
          this.useOperand(value)
          break
        case GET:
          try {
            this.getResult()
          } catch (e){
            this.input = '0'
            this.screen = 'Error'
            console.error(e)
          }
          break
        case CLEAR_ALL:
          this.clearAll()
          break
        case CLEAR_LAST:
          this.clearLast()
          break
        case COMA:
          this.insertComa()
          break
        case LINK:
          window.location.href = GITHUB_LINK
          break
        default:
          break
      }

      this.watchScreen()
    },
    print(s){
      if (this.screen == '0' || this.screen.includes('=') || this.screen.includes('Error') || this.screen.includes('NaN')){
        this.screen = s
      } else {
        this.screen += s
      }
    },
    watchScreen(){
      const len = this.screen.length
      const setFontSize = amount => document.getElementById('screen').style.fontSize = `${amount}rem`

      if (len < 11){
        setFontSize(2.5)
      } else {
        const amount = (11 / len) * 2.3
        if (amount > 1){
          setFontSize(amount)
        }
      }

      if (this.screen.includes(',')){
        if (len == 23){
          this.forbidSymbols = true
        } else {
          this.forbidSymbols = false
        }
      } else {
        if (len == 22){
          this.forbidSymbols = true
        } else {
          this.forbidSymbols = false
        }
      }
    },
    insertDigit(n){
      if (this.forbidSymbols){
        return false
      }
      if (this.input == '0'){
        this.input = n
      } else {
        this.input += n
      }
      this.print(n)

      return true
    },
    insertComa(){
      if (this.forbidSymbols) {
        return false
      }
      if (this.screen.split(',').length == 1){
        this.screen += ','
        this.input += '.'
        return true
      }
    },
    useOperand(op){
      if (OPERANDS.includes(this.lastChar)){
        return false
      }
      if (op == '%'){
        const l = - this.screen.length
        const n = String(Number(this.screen) / 100) 
        this.screen = n.replace('.', ',')
        this.input = this.input.slice(0, l)
        this.input += n
        return true
      }
      this.screen = '0'
      this.input += op
      this.forbidSymbols = false
      return true
    },
    clearAll(){
      this.input = '0'
      this.screen = '0'
      this.cells[0].content = 'AC'
    },
    clearLast(){
      if (this.screen.includes('NaN') || this.screen == 'Error' || this.input == '0' || this.screen.includes('=')){
        return this.clearAll()
      }
      if (this.screen != '0'){
        this.screen = this.screen.slice(0, -1)
        this.input = this.input.slice(0, -1)
        if (this.screen.length == 0){
          this.screen = '0'
        }
        if (this.input.length == 0){
          this.input = '0'
        }
      } else {
        this.input = this.input.slice(0, -1)
        this.screen = this.numberBeforeLastOperandIsUsed ? this.numberBeforeLastOperandIsUsed : '0'
      }

      this.screen = this.screen.replace('= ', '')
    },
    getResult(){
      if (this.input == '0'){
        return false
      }

      if (OPERANDS.includes(this.lastChar)){
        this.input += '0'
      }

      let result = Number(eval(this.input)).toString()

      if (result.includes('.')){
        if (result.includes('.000000000')){     
          result = result.split('.')[0]
        } else if (result.split('.')[1].length > 9){
          result = Number(result).toFixed(9).toString()
        }
      }

      this.input = result
      this.screen = `= ${result.replace('.', ',')}`
      this.forbidSymbols = false

      return true
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");
*,
*::before,
*::after,
*:focus {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: 0;
  outline: 0;
}

$dark: #252525;
$light: #fff;
$bright: #f56e00;

html{
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
}

body {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lato", sans-serif;
  background-color: $light;
  padding: 1rem;

  *{
    font-family: inherit;
  }
}

.container{
  width: 268px;
  background-color: $dark;
  border-radius: 6px;
  box-shadow: 2px 2px 5px 0 $dark;
  padding: 1.25rem 1rem;
}

.grid{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: .75rem;
}

.btn{
  justify-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 1.75rem;
  font-weight: 700;
  background-color: $dark;
  border-radius: 50%;
  color: $light;
  cursor: pointer;
  transition: background-color .125s linear;

  &:hover{
    background-color: #65656565;
  }
}

.action,
.operand{
  color: $bright;
}

.link{
  background: url('./github.svg') no-repeat center;
  transform-origin: center;
  transition: .12s linear;
  &:hover{
    background-color: $dark;
    transform: scale(1.05);
  }
}

.equal{
  background-color: $bright;
  transition: transform .2s ease-in-out;
  transform-origin: center center;

  &:hover{
    background-color: $bright;
    transform: scale(.93)
  }
}

.result{
  margin-bottom: .75rem;
  position: relative;

  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    left: 0;
    background-color: #444444cc;
  }
}

#screen{
  display: block;
  text-align: right;
  width: 100%;
  min-height: 3rem;
  background-color: $dark;
  color: $light;
  font-weight: 700;
  font-size: 2.5rem;
}
</style>