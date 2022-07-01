import { themeChange } from './theme.mjs';
import themes from "./themes.json" assert {type: 'json'};


const buttons = document.querySelectorAll('button');
const monitor = document.querySelector('.screen');
const setting = document.querySelector('.settings-button')
const root = document.querySelector(':root');
const body = document.body;
let firstInput = null;
let secondInput = null;
let focusedOperator = null;
let onLightMode = false;



buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonClicked = event.target;
        const inputValue = buttonClicked.getAttribute('data-input');
        buttonClicked.getAttribute('class') == 'number' ? numberInput(inputValue) : operatorInput(inputValue);
    })
});

setting.addEventListener('click', () => {
    themeChange(document.querySelector(':root'), onLightMode ? themes.defaultDark : themes.defaultLight);
})

setting.addEventListener('click', () => {
    themeChange(document.querySelector(':root'), onLightMode ? onLightMode = false : onLightMode = true);
})

document.addEventListener('keydown', (e)=>{
    if(e.code == "Backspace") return operatorInput('backspace');
    if(/[0-9]/.test(e.code[e.code.length - 1])) return numberInput(e.code[e.code.length - 1]);
    if(e.code == 'Escape') return operatorInput('clear');
    if (e.code == 'NumpadEnter') return operatorInput('equal');
    if(e.code == 'NumpadAdd') return operatorInput('+');
    if(e.code == 'NumpadSubtract') return operatorInput('-');
    if(e.code == 'NumpadMultiply') return operatorInput('x');
    if (e.code == 'NumpadDivide122') return operatorInput('/');
})


function performOperation(firstInput, secondInput, typeOfOperator) {
    const x = parseFloat(firstInput);
    const y = parseFloat(secondInput);
    let answer;

    switch (typeOfOperator) {
        case '+':
            answer = x + y;
            break;

        case '-':
            answer = x - y;
            break;

        case '/':
            answer = x / y;
            break;

        case 'x':
            answer = x * y;
            break;

        case '%':
            answer = x * (y / 100);
            break;
    }
    return answer.toString();
}


//inputs //

function numberInput(inputValue) {
    const screen = monitor.textContent;
    if (screen.length >= 9) return;

    switch (inputValue) {
        case '.':
            if (nullValidator() == null) {
                monitor.textContent = '0.';
                firstInput = '0.';
                break;
            }

            else if (nullValidator() == 1) {
                if (/\./g.test(monitor.textContent)) break;
                firstInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

            else if (nullValidator() == 2 || nullValidator() == 3) {
                if (secondInput == null) {
                    secondInput = '0.';
                    monitor.textContent = '0.';
                    break;
                }
                if (/\./g.test(secondInput)) break;
                secondInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

        case '0':
            if (nullValidator() == null) {
                if (/0/g.test(monitor.textContent)) break;
                monitor.textContent = '0';
                break;
            }

            else if (nullValidator() == 1) {
                firstInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

            else if (nullValidator() == 2) {
                if (/0/g.test(monitor.textContent)) break;
                monitor.textContent = '0';
                break;
            }

            else if (nullValidator() == 3) {
                secondInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

        case inputValue.match(/[1-9]/).toString():
            if (nullValidator() == null) {
                firstInput = inputValue;
                console.log(1);
                monitor.textContent = inputValue;
                break;
            }

            else if (nullValidator() == 1) {
                console.log(2);

                firstInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

            else if (nullValidator() == 2) {
                console.log(3);

                secondInput = inputValue;
                monitor.textContent = inputValue;
                break;
            }

            else if (nullValidator() == 3) {
                console.log(4);

                secondInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

    }

};

function operatorInput(inputValue) {

    switch (inputValue) {
        case 'clear':
            firstInput = null;
            secondInput = null;
            focusedOperator = null;
            monitor.textContent = '';
            break;

        case 'backspace':
            if (nullValidator() == 1) {
                const backspace = firstInput.split('').splice(0, firstInput.length - 1).join('');
                firstInput = backspace;
                firstInput.length <= 0 ? firstInput = null : console.log('zero text left');
                console.log(firstInput);
                monitor.textContent = backspace;
                break;
            }

            else if (nullValidator() == 2) {
                focusedOperator = null;
                monitor.textContent = firstInput;
                break;
            }

            else if (nullValidator() == 3) {
                const backspace = secondInput.split('').splice(0, secondInput.length - 1).join('');
                if (backspace.length <= 0){
                    secondInput = null;
                    monitor.textContent = focusedOperator;
                    break;
                }

                secondInput = backspace;
                monitor.textContent = backspace;
                break;
            }

            else if (nullValidator() == null) break;

        case '+': case '-': case '/': case 'x': case '%':
            if (nullValidator() == null) break;
            if (nullValidator() == 1 || nullValidator() == 2) {
                focusedOperator = inputValue;
                monitor.textContent = inputValue;
                break;
            }
            if (nullValidator() == 3) {
                const answer = performOperation(firstInput, secondInput, focusedOperator);

                if (answer.length > 9) {
                    focusedOperator = null;
                    firstInput = null;
                    secondInput = null;
                    monitor.textContent = 'exceeded';
                    return;
                }

                monitor.textContent = answer;
                focusedOperator = inputValue;
                secondInput = null;
            }

        case 'equal':
            if (nullValidator() == 3) {
                const answer = performOperation(firstInput, secondInput, focusedOperator);

                if (answer.length > 9) {
                    monitor.textContent = 'exceeded';
                    firstInput = null;
                    secondInput = null;
                    focusedOperator = null;
                    console.log( `${firstInput} ${secondInput} ${focusedOperator}`);
                    return;
                }

                monitor.textContent = answer;
                firstInput = answer;
                focusedOperator = null;
                secondInput = null;
            }
    }
}


//validator//
function nullValidator() {
    if (!firstInput && focusedOperator && !secondInput) return null;
    if (firstInput && !focusedOperator && !secondInput) return 1;
    if (firstInput && focusedOperator && !secondInput) return 2;
    if (firstInput && focusedOperator && secondInput) return 3;
}
