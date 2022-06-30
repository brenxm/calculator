export function performOperation(firstValue, secondValue, operation) {
    console.log(firstValue);
    const x = parseFloat(firstValue);
    const y = parseFloat(secondValue);
    let answer;

    switch (operation) {
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

    if (answer.toString().length > 9) {
        return `too long`;
    }

    return answer.toString();
};

export function nullValidator(firstInput, secondInput, focusedOperator) {
    if (!firstInput && focusedOperator && !secondInput) return null;
    if (firstInput && !focusedOperator && !secondInput) return 1;
    if (firstInput && focusedOperator && !secondInput) return 2;
    if (firstInput && focusedOperator && secondInput) return 3;
}

export function operatorInput(firstInput, secondInput, focusedOperator, inputValue, monitor) {

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
                monitor.textContent = backspace;
                break;
            }

            else if (nullValidator() == 2) {
                focusedOperator = null;
                monitor.textContent = '';
                break;
            }

            else if (nullValidator() == 3) {
                const backspace = secondInput.split('').splice(0, secondInput.length - 1).join('');
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
                firstInput = performOperation(firstInput, secondInput, focusedOperator);
                monitor.textContent = firstInput;
                focusedOperator = inputValue;
                secondInput = null;
            }

        case 'equal':
            if (nullValidator() == 3) {
                firstInput = performOperation(firstInput, secondInput, focusedOperator);
                monitor.textContent = firstInput;
                secondInput = null;
                focusedOperator = null;
            }
    }
}

export function numberInput(firstInput, secondInput, focusedOperator, inputValue, monitor) {
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
                monitor.textContent = inputValue;
                break;
            }

            else if (nullValidator() == 1) {
                firstInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

            else if (nullValidator() == 2) {
                secondInput = inputValue;
                monitor.textContent = inputValue;
                break;
            }

            else if (nullValidator() == 3) {
                secondInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

    }

};



