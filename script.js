const buttons = document.querySelectorAll('button');
const monitor = document.querySelector('.screen');

let firstInput = null;
let secondInput = null;
let focusedOperator = null;

buttons.forEach(button => {
    button.addEventListener('click', (event)=>{
        const buttonClicked = event.target;
        const inputValue = buttonClicked.getAttribute('data-input');
        buttonClicked.getAttribute('class') == 'number' ? numberInput(inputValue) : operatorInput(inputValue);
    })});



//operational functions//

function performOperation(firstInput, secondInput, typeOfOperator){
    switch(typeOfOperator){
        case 'plus' :
        return firstInput + secondInput;

        case 'minus' :
        return firstInput - secondInput;

        case 'divide' :
        return firstInput / secondInput;

        case 'multiply' :
        return firstInput * secondInput;

        case 'percentage' :
        return firstInput * (secondInput / 100);
    }
}


//inputs //

function numberInput(inputValue){
    const screen = monitor.textContent;
    if (screen.length >= 9) return;

    switch(inputValue){
        case '.' :
            if (nullValidator() == null){
                monitor.textContent = '0.';
                firstInput = '0.';
                break;
            }

            else if (nullValidator() == 1){
                if(/\./g.test(monitor.textContent)) break;
                firstInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

            else if (nullValidator() == 2 || nullValidator() == 3){
                if(secondInput == null) {
                    secondInput = '0.';
                    monitor.textContent = '0.';
                    break;
                }
                if (/\./g.test(secondInput)) break;
                secondInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

        case '0' :
            if (nullValidator() == null){
                if (/0/g.test(monitor.textContent)) break;
                monitor.textContent = '0';
                break;
            }

            else if (nullValidator() == 1){
                firstInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

            else if (nullValidator() == 2){
                if (/0/g.test(monitor.textContent)) break;
                monitor.textContent = '0';
                break;
            }

            else if (nullValidator() == 3){
                secondInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }
        
        case inputValue.match(/[1-9]/).toString() :
            if(nullValidator() == null){
                firstInput = inputValue;
                monitor.textContent = inputValue;
                break;
            }

            else if (nullValidator() == 1){
                firstInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

            else if (nullValidator() == 2){
                secondInput = inputValue;
                monitor.textContent = inputValue;
                break;
            }

            else if (nullValidator() == 3){
                secondInput += inputValue;
                monitor.textContent += inputValue;
                break;
            }

    }
        
};

function operatorInput(inputValue){
    
    switch(inputValue){
        case 'clear' :
            firstInput = null;
            secondInput = null;
            focusedOperator = null;
            monitor.textContent = '';
            return;
        
        case 'backspace' :
            if(nullValidator() == 1){
               const backspace = firstInput.split('').splice(0, firstInput.length - 1).join('');
               firstInput = backspace;
               monitor.textContent = backspace;
               return;
            } 

            else if (nullValidator() == 2){
                focusedOperator = null;
                monitor.textContent = '';
                return;
            }

            else if (nullValidator() == 3){
                const backspace = secondInput.split('').splice(0, secondInput.length - 1).join('');
                secondInput = backspace;
                monitor.textContent = backspace;
                return;
            }
        
        case '+':
        case '-':
        case '/':
        case 'x':
        case '%': 
        console.log('clicked');
        focusedOperator = inputValue;
        monitor.textContent = inputValue;
    }
    if (nullValidator() == null) return;
    switch(inputValue){
        case 'plus':
        case 'minus':
        case 'divide':
        case 'multiply':
        case 'percentage':
    }

}


//validator//
function nullValidator(){
    if (!firstInput && focusedOperator && !secondInput ) return null;
    if (firstInput && !focusedOperator && !secondInput) return 1;
    if (firstInput && focusedOperator && !secondInput) return 2;
    if (firstInput && focusedOperator && secondInput) return 3;
}
