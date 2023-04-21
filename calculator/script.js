const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  if (operator === "+") {
    result = n1 + n2;
  } else if (operator === "-") {
    result = n1 - n2;
  } else if (operator === "*") {
    result = n1 * n2;
  } else if (operator === "/") {
    result = n1 / n2;
  }
  return String(result);
}
buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      if (firstOperend.textContent === "0") {
        firstOperend.textContent = buttonContent;
      } else {
        secondOperend.textContent = buttonContent;
      }
      console.log('숫자 ' + buttonContent + ' 버튼');
    }

    if (action === 'operator') {
      operator.textContent = buttonContent;

      console.log('연산자 ' + buttonContent + ' 버튼');
    }

    if (action === 'decimal') {
      // console.log('소수점 버튼');
    }

    if (action === 'clear') {
      firstOperend.textContent = "0";
      secondOperend.textContent = "0";
      operator.textContent = "+";
      calculatedResult.textContent = "0";

      console.log('초기화 버튼');
    }
    if (action === 'calculate') {
      calculatedResult.textContent = calculate(parseFloat(firstOperend.textContent), operator.textContent, parseFloat(secondOperend.textContent))
      console.log('계산 버튼');
    }
  }
});

// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum = "", operatorForAdvanced, previousKey;
let previousNum = "";
let secondNum = "";
display.textContent = "0";
firstNum = "";
secondNum = "";
previousKey = 'clear';
previousNum = "";
buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
  if (target.matches('button')) {
    if (action === 'number') {
      if (previousKey === 'operator') {
        secondNum += buttonContent;
        display.textContent = secondNum;
      } else {
        if (display.textContent === "0") {
          firstNum += buttonContent
          display.textContent = firstNum;
        } else {
          display.textContent += buttonContent;
        }
      }
    }

    if (action === 'operator') {
      if(previousKey === 'clear'){
      firstNum = display.textContent;
      operatorForAdvanced = buttonContent;
      previousKey = 'operator';
      }else if(previousKey ==='operator' && secondNum != "") {
        
        let a = calculate(parseFloat(firstNum), operatorForAdvanced, parseFloat(secondNum));
        firstNum = a;
        secondNum = "";
        display.textContent = a;
      }
      operatorForAdvanced = buttonContent;
      
    }

    if (action === 'decimal') {
      if (previousKey === 'operator') {
        if (!secondNum.includes(".")) {
          if (secondNum === "") {
            secondNum += "0";
          }
          secondNum += buttonContent;
          display.textContent = secondNum;
        }
      }
      else {
        if (!firstNum.includes(".")) {
          firstNum += buttonContent;
          display.textContent += buttonContent;
        }
      }

    }

    if (action === 'clear') {
      display.textContent = "0";
      firstNum = "";
      secondNum = "";
      previousKey = 'clear';
      previousNum = "";
    }

    if (action === 'calculate') {
      if(secondNum == ""&&previousKey != "clear"){
        secondNum = firstNum;
        previousNum = calculate(parseFloat(firstNum), operatorForAdvanced, parseFloat(secondNum));
        display.textContent = previousNum;
      }else if (secondNum != "") {
        if (previousNum != "") {
          previousNum = calculate(parseFloat(previousNum), operatorForAdvanced, parseFloat(secondNum));
          display.textContent = previousNum;
        }
        else {
          previousNum = calculate(parseFloat(firstNum), operatorForAdvanced, parseFloat(secondNum));
          display.textContent = previousNum;
        }
      }
    }

  }
});