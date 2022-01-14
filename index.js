// Creating all button variables
// In order the order of appearance on the calculator
const c = document.getElementById('c');
const posNeg = document.getElementById('pos-neg');
const modulos = document.getElementById('modulos');
const divide = document.getElementById('divide');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const multiply = document.getElementById('multiply');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const minus = document.getElementById('minus');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const add = document.getElementById('add');
const zero = document.getElementById('zero');
const period = document.getElementById('period');
const equals = document.getElementById('equals');

const numberButtons = [one, two, three, four, five, six, seven,
    eight, nine, zero, period]
const operationButtons = [ modulos, divide, multiply, 
    minus, add]

const displayTextElement = document.getElementById('display-line');
const previousTextElement = document.getElementById('previous-num')
const previousMark = '▽'

// Creating functions for onClick events

class Calculator {
    constructor(previousTextElement, displayTextElement) {
        this.previousTextElement = previousTextElement;
        this.displayTextElement = displayTextElement;
        this.clear();
    }

    clear(){
        this.displayNum = '';
        this.previousNum = '';
        this.operand = undefined;
    };
    

    appendNum(number){
        if(number == '.' && this.displayNum.includes('.')) {return}
        else if(this.displayNum.length > 14) {return}
        this.displayNum = this.displayNum.toString() + number.toString();
    };

    chooseOperand(operand){
        if (this.displayNum == '') return;
        if (this.previousNum !== '') {
            this.calculate()
        }
        this.operand = operand;
        this.previousNum = this.displayNum;
        this.displayNum = '';
    };

    posNeg(){
        if (this.displayNum[0] !== '-'){
            this.displayNum = '-' + this.displayNum;
        } else if (this.displayNum.includes('-')){
            this.displayNum = this.displayNum.replace('-', '')
        }
        }
    

    calculate(){
        let computation;
        const prev = parseFloat(this.previousNum);
        const current = parseFloat(this.displayNum);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operand){
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = (prev % current).toFixed(5);
                break;
            default:
                return;
        }
        this.displayNum = computation;
        this.operand = undefined;
        this.previousNum = '';
    };

    updateDisplay(){
        this.displayTextElement.innerText = this.displayNum;
        this.previousTextElement.innerText = this.previousNum;
    };
};

const calculator = new Calculator(previousTextElement, displayTextElement)


// Creating event listeners for all buttons

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperand(button.innerText);
        calculator.updateDisplay();
    })
})

equals.addEventListener('click', button => {
    calculator.calculate();
    calculator.updateDisplay();
})

c.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

posNeg.addEventListener('click', button => {
    calculator.posNeg();
    calculator.updateDisplay();
})

