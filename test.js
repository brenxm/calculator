


let inputer = 20;

function immutableFunction(value, input){
    input = value;
}

immutableFunction(10, inputer);

console.log(inputer)