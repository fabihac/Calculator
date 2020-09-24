class Calculator { //step 2
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;/*referencing the value as its class perameter */
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false; /* to reset value of current operand*/
        this.clear();

    }

    clear(){
        this.currentOperand = ' ';//clearing all values using empty string
        this.previousOperand = ' ';
        this.operation = undefined;


    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0,-1);/*taking the current operand and slice the  the last input which will be the first index[0] to [-1] index LIFO method */ 

    }
    appendNumber(number){ //step 4
        if (number === '.' && this.currentOperand.includes('.')) return /*if there is a (.) and currentoperand has a (.) this condition will avoid adding more (.) */
            /*in this way if a number is pressed then the 2nd number will be appended in current operand otherwise if there is a number in the display if you add another one javascript will be automatically remove the first one n display next one  */
        this.currentOperand = this.currentOperand.toString() + number.toString();


    }
    chooseOperation(operation){
        if (this.currentOperand === '') return /*if there is no number or empty string , operator function will execute next*/
            /*if there is operator it will run the compute function and compute autoatically in a other way if add 2 operator one after another it will do the first one and will hold the 2nd one in array*/
            if (this.previousOperand !== '') 
               { this.compute();}
            
        this.operation = operation;
         this.previousOperand = this.currentOperand;/*whenever a operator is clicked its will make the current operand to prev operant amd also make the current operand empty*/
        this.currentOperand = '';

    }
    compute(){
        let compulation;
        const prev = parseFloat(this.previousOperand);//persing string operand to float and put in a const
        const current = parseFloat(this.currentOperand);
         
        if (isNaN(prev) || isNaN(current)) return ;/*if there is no num in the current or prev const*/
        
        switch(this.operation)//excecuting the computation
        {
            case '+':
            compulation = prev + current;
            break;
             case '-':
            compulation = prev - current;
            break;
             case '*':
            compulation = prev * current;
            break;
             case '/':
            compulation = prev / current;
            break;
            default:
            return;
        } 
        this.readyToReset = true; /*after executing the computation resest function will be true that means if a new number is clicked the whole div will be cleared and no longer have to click the clear button everytime a compution is done*/
        this.currentOperand = compulation;//to only show the coputed result not other numbers
        this.previousOperand = '';
        this.operation = undefined;
        


    }

    updateDisplay(){ //step 5
        this.currentOperandTextElement.innerText =this.currentOperand;/*taking the current operand to display*/
        if (this.operation != null) {
            //if there is a operator then the oprator n the prev oprand will be displayed together
           this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`; 
        }  else {
            /*if there is no operation or the computation is done then the prev operand will be remove and replaced with empy string*/
            this.previousOperandTextElement.innerText ='';

        }

    }

}

const numberButtons = document.querySelectorAll('[data-number]');// step 1
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement  = document.querySelector('[data-previous-operand]');
const currentOperandTextElement  = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);//object creation

//every button now have a event
numberButtons.forEach(button => { //step 3
    button.addEventListener('click', () => {
        /*if there there is no prev operand and there is only current opperand then this condition will empty the current operand which was made true in the Compute() function  and after making empty the current operand readytostate will declare false again */
        if ( calculator.previousOperand === '' && calculator.currentOperand !== ' ' && calculator.readyToReset) {
            calculator.currentOperand = ' ';
            calculator.readyToReset = false ;
        }
        calculator.appendNumber(button.innerText);/* when button is clicked append() function will took the button number in calculator as string*/ 
        calculator.updateDisplay();//will display in calculator onject
    });

});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);//same
        calculator.updateDisplay();
    });

});


equalsButton.addEventListener("click",button => {
        calculator.compute();//when equals is clicked is compute the numbers
        calculator.updateDisplay(); //and display the result
    });

allClearButton.addEventListener("click",button => {
        calculator.clear(); 
        calculator.updateDisplay(); 
    });
deleteButton.addEventListener("click",button => {
        calculator.delete();
        calculator.updateDisplay(); 
    });
    

    