import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calulator',
  templateUrl: './calulator.component.html',
  styleUrls: ['./calulator.component.scss'],
})
export class CalulatorComponent implements OnInit {
  @Input() keyPressed: string = '';
  display: string = '';
  buttons = [7, 8, 9, 'x', 4, 5, 6, '/', 1, 2, 3, '+', 0, 'C', '.', '-', '=', '+/-'];
  functions = '+-x/^';

  constructor() {}

  ngOnInit(): void {}
  num1 = '';
  num2 = '';
  func = '';
  ans = 0;
  displayKey(inputText: string) {
    // Clear function
    if (inputText == 'C') {
      this.resetCalc()
      return;
    }
    // Equals function
    else if (inputText == '=') {
      if(this.num1 == ''){
        return
      }
      else if(this.display.includes(this.functions)){
        this.display = 'invalid calculation'
        return
      }
      this.num2 = this.display;
      this.calculate(this.num1, this.num2);
    }else if(this.functions.includes(inputText)){
        if(this.display == ''){
          alert("You cannot perform a calculation without 2 numbers")
          return
        }else{
          if(this.num1 == ''){
            this.num1 = this.display
            this.func = inputText
            this.display = inputText
          }else{
            this.num2 = this.display
            this.calculate(this.num1, this.num2)
            this.num1 = this.ans.toString()
            this.func = inputText
            this.display = inputText
          }
        }
    }else if(inputText == '+/-'){if(Number(this.display)){
      console.log(Number(this.display))
      this.display = (Number(this.display)*-1).toString()}
    }else{
      if(inputText == '.' && this.display.includes('.')){
        return
      }if(this.functions.includes(this.display)){
        this.display = inputText
      }else{
        this.display += inputText
      }
      }
    
  }
  /**
   *  If i put in a minus sign,
   *  if there isn't already a minus sign and num2 or num1 are empty, then this is a negative number (append text to the display)
   *  if there is a minus sign and func is empty, then this is a function (dont append text to it)
   */

   calculate(num1: string, num2: string) {
    console.log(this.num1, this.func, this.num2);
    switch (this.func) {
      case '-':
        this.ans = Number(num1) - Number(num2);
        this.display = this.ans.toString();
        break;
      case '+':
        this.ans = Number(num1) + Number(num2);
        this.display = this.ans.toString();
        break;
      case 'x':
        this.ans = Number(num1) * Number(num2);
        this.display = this.ans.toString();
        break;
      case '/':
        this.ans = Number(num1) / Number(num2);
        this.display = this.ans.toString();
        break;
      default:
        this.display = 'invalid calculation';
    }
  }
  resetCalc() {
    this.display = '';
    this.func = '';
    this.num1 = '';
    this.num2 = '';
    this.ans = NaN
  }
}


