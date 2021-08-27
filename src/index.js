function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
// check for brackets pairign /////////////////////
let brCache = [];
for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '('){
      brCache.push('(');
    } else if (expr[i] === ')'){
      if(brCache.length == 0) throw new Error("ExpressionError: Brackets must be paired");
      if(brCache[brCache.length-1] === '('){
        brCache.pop();
      }
    };
  }
if(brCache.length !== 0) throw new Error("ExpressionError: Brackets must be paired");

// define operations priority /////////////////////
function getPriority(operator){
  switch (operator) {
    case '+':
      return 2
      break;
    case '-':
      return 2
      break;
    case '/':
      return 1
      break;
    case '*':
      return 1
      break;
    case '(':
      return 3
      break;
    default:
      // return null;
      break;
  }
}

// clear whitespaces ///////////////////////////////
  expr=expr.replace(/\s+/g, "");

// create sentence /////////////////////////////////
  let outArr = [];
  let digBuff = [];
  let operStack = [];

  let operators = '+-/*'
  let brackets = '()'
  let digits = '.0123456789'

  for (let i = 0; i < expr.length; i++) {
    if (digits.includes(expr[i])) {
      digBuff.push(expr[i]);
    } else if(operators.includes(expr[i])) {

      if (digBuff.length != 0){
        outArr.push(digBuff.join(''));
        digBuff = [];
      }

      if (operStack.length != 0){
        while ((getPriority(expr[i])) >= getPriority(operStack[operStack.length-1])){
            outArr.push(operStack.pop());
        }
      }
        operStack.push(expr[i]);
    } else if(brackets.includes(expr[i])){
      if (digBuff.length != 0){
        outArr.push(digBuff.join(''));
        digBuff = [];
      }

      if (expr[i]=='(') {
        operStack.push(expr[i])
      }
      else if (expr[i]==')'){
        while(operStack[operStack.length-1]!=='('){
          outArr.push(operStack.pop());
        }
        operStack.pop();
      }
    }
    
    if(i == expr.length - 1){
      if (digBuff.length != 0){
        outArr.push(digBuff.join(''));
        digBuff = [];
      }
    while(operStack.length!=0) outArr.push(operStack.pop());
    }
  }
//calcualte//////////////////////////////////////////////
let resArr = [];
for (let i = 0; i < outArr.length; i++) {
  if (outArr[i].match(/[0-9.]/)){
      resArr.push(outArr[i])
    } else if (operators.includes(outArr[i])){
      let A, B;
      switch (outArr[i]) {
        case '+':
          A = +resArr.pop();
          В = +resArr.pop();
          resArr.push(В + A);
          break;
        case '-':
          A = +resArr.pop();
          В = +resArr.pop();
          resArr.push(В - A);
          break;
          case '*':
            A = +resArr.pop();
            В = +resArr.pop();
          resArr.push(В * A);
          break;
          case '/':
          A = +resArr.pop();
          В = +resArr.pop();
          if (A == 0) throw new Error('TypeError: Division by zero.');
          resArr.push(В / A);
          break;
          default:
            break;
          }
        }
      }
      return +resArr[0].toFixed(4);
    }

    module.exports = {
          expressionCalculator
}

// debugger
// let expr = "2.1 + 2";
// console.log(expressionCalculator(expr));
// 4.1

// expr = "1/2";
// console.log(expressionCalculator(expr));
// 0.5;

// expr = "1 / 0";
// console.log(expressionCalculator(expr));
//throw("TypeError: Division by zero.");

// expr = "(2 + 2 - 1) * 3";
// console.log(expressionCalculator(expr));
// //"ExpressionError: Brackets must be paired"

// expr = "(6+10-4)/(1+1*2)+1";
// console.log(expressionCalculator(expr));


// expr = " 49 * 63 / 58 * 36 ";
// console.log(expressionCalculator(expr));
// 1916.0690;


// expr = " 48 + 59 * 86 * 92 * 23 ";
// console.log(expressionCalculator(expr));
// 10736632.0000;

// expr = " 20 - 57 * 12 - (  58 + 84 * 32 / 27  ) ";
// console.log(expressionCalculator(expr));
// -821.5556;

// debugger
// expr = " 100 - 60 / 38 + (  19 / 88 * 97 / 82 / 94  ) * 92 ";
// console.log(expressionCalculator(expr));
// 98.6710;


//  expr = " (  6 + 28 + 18 - (  (  61 + 17 * 64 * 98  ) * (  61 / 53 * 47 / 36 * 98  ) + 82 + (  69 - 55 / (  62 * 77 / 88 - 52 / 10  ) - 42 - (  48 / 84 * 77 + 40 - 13  )  )  )  ) - 4 / 99 ";
//  console.log(expressionCalculator(expr));
// //-15710078.0585.

// expr = " 31 * 21 + 14 / (  (  18 * 52 / (  43 - 74 / 89 - 12  ) + 8  ) + 3 / 0 + (  9 + 81 + 19 * 94 / (  0 * 71 + 53 - 20 * 94  )  )  ) ";
// console.log(expressionCalculator(expr));
// //TypeError: Division by zero.
