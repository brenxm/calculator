import {performOperation, nullValidator, operatorInput, numberInput} from "./mathoperations.mjs";
const buttons = document.querySelectorAll('button');
const monitor = document.querySelector('.screen');

let firstInput = null;
let secondInput = null;
let focusedOperator = null;

buttons.forEach(button => {
    button.addEventListener('click', (event)=>{
        const buttonClicked = event.target;
        const inputValue = buttonClicked.getAttribute('data-input');
        buttonClicked.getAttribute('class') == 'number' ? numberInput(firstInput, secondInput, focusedOperator, inputValue, monitor) : operatorInput(firstInput, secondInput, focusedOperator, inputValue, monitor);
    })});




