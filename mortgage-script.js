const errorFields = document.querySelectorAll('p.errorStates');
const inputHoverStates = document.querySelectorAll('.hover');
const inputValidity = document.querySelectorAll("input[type='text'], input[type='number'], input[type='radio']");
let text = `Your results are shown below based on the information you provided. 
            To adjust the results, edit the form and click  "calculate repayments" 
            again.`

console.log(inputValidity);
const noErrors = new Map([
    ['slate500', 'hsl(200, 26%, 54%)']
]);
const hoverStates = new Map([
    ['slate900', 'hsl(202, 55%, 16%)']
]);
const errorStates = new Map([
  ["error", "This field is required"]

]);
const changeResultsPage = new Map([
  ['para', text ]
]);

// Results Page
const resultsContent = [
  { element: 'h2', class: 'mb-3', content: 'Your results' },
  { element: 'p', class: 'mb-4', content: changeResultsPage.get('para') },
  { element: "section", class: 'rounded p-3 mb-3 border-top border-4', id: "resultsField",
    content: [
      { element: 'div', class: 'border-bottom border-2', id: 'monthyPaymentField', 
        content: [
          { element: 'h6', class: 'mt-2', id:"monthlyHeader", content: "Your monthly repayments" },
          { element: 'h1', id: 'monthlyPayments', class: 'mb-3', content: `` }
      ]},
      { element: 'h6', class: 'mt-3', content: "Total you'll repay over the term"},
      {element: 'h3', id: 'termPayments', content: ''}
    ]}
];
class mortgageObject {
  constructor(amount, term, rate, type) {
    this.mortAmount = amount;
    this.mortTerm = term;
    this.intRate = rate;
    this.mortType = type;
  }
}
function sortInputs() {
  const sortedInputObjects = {}; 
  const amountFieldArray = [];
  const termFieldArray = [];
  const rateFieldArray = [];
  
  for (let y of inputHoverStates) {
   y.classList.forEach( (ele) => {
    if (ele.startsWith("amountField")) {
      amountFieldArray.push(y);
      sortedInputObjects.amount = amountFieldArray;
    } else if (ele.startsWith('termField')) {
      termFieldArray.push(y);
      sortedInputObjects.term = termFieldArray;
    } else if (ele.startsWith('rateField')) {
      rateFieldArray.push(y);
      sortedInputObjects.rate = rateFieldArray;
    }
   });
  }
  return sortedInputObjects;
}
const sortedInputs = sortInputs();

 function hover(inputStates) {
  let tag = inputStates[0].tagName;
  tag === 'SPAN' ? [inputStates[0], inputStates[1]] = [inputStates[1], inputStates[0]]: 
                   [inputStates[0], inputStates[1]] = [inputStates[0], inputStates[1]];
  let[input, span] = inputStates;
  input.addEventListener('mouseenter', (element) => {
    element.target.style.borderColor = hoverStates.get('slate900');
    span.style.borderColor = hoverStates.get('slate900');
    
    element.target.addEventListener('focusin', () => {
      span.classList.add('focusSpan');
    });
    element.target.addEventListener('focusout', () => {
      span.classList.remove('focusSpan');
    });
  }); 
  input.addEventListener('mouseleave', (element) => {
    element.target.style.borderColor = noErrors.get('slate500');
    span.style.borderColor = noErrors.get('slate500');
  }); 
 }
hover(sortedInputs.amount);
hover(sortedInputs.term);
hover(sortedInputs.rate);

function switchMortgageType() {
  const mortgageTypes = Array.from(inputValidity).slice(3);
  let [repay, interest] = mortgageTypes;
  for (let o of mortgageTypes) {
    o.addEventListener('click', (element) => {
      let parent = element.target.parentElement;
      let id = element.target.id;
        switch(id) {
          case 'repay':
            parent.classList.add('mortgageType');
            interest.parentElement.classList.remove('mortgageType');
            break;
          case 'interest':
            parent.classList.add('mortgageType');
            repay.parentElement.classList.remove('mortgageType');
            break;
         }
      })
    }
  }

switchMortgageType();


function clearFields() {
  const clearAll = document.querySelector('input[type = "reset"]');
  clearAll.addEventListener('click', () => {
    for (let clear of inputValidity) {
      switch (clear.type) {
        case 'text':
          clear.value = "";
          break;
        case "number":
          clear.value = "";
          break;
        case "radio":
          clear.checked = false;
          clear.parentElement.classList.remove('mortgageType');
          break;
      }
    }
  })
}
clearFields();


function checkFields() {
  checkNumbers();
  checkOptions();
  const checkMorgageObject = createMortgageObject();
  console.log(checkMorgageObject);
  const mortgageValues = Object.values(checkMorgageObject);
  console.log(mortgageValues);

  if (mortgageValues.includes(undefined) || mortgageValues.includes(false)) {
    console.error("Include all fields!");
  } else {
    calculateMortgage(checkMorgageObject);
    displayResults('resultsCompletedField', 'div', resultsContent);
  }
}
function createMortgageObject() {
  const mortgageNumbersArray = checkNumbers();
  let radio = checkOptions();
  let [amount, term, rate] = mortgageNumbersArray;
  const mortgage = new mortgageObject(amount, term, rate, radio);
  return mortgage;
}
function checkCommas(value) {
  let commas = /,/g;
  let isThereComma = commas.test(value);
  if (isThereComma === true) {
    let replace = value.replace(commas, "");
    return Number(replace);
  } else {
    return Number(value);
  }

}

function checkNumbers() {
  const arr = [];
  const mortgageNumbersArray = [];
  for (let a in sortedInputs) {
    arr.push(sortedInputs[a]);
  }
  for (let b of arr) {
    for (let c of b) {
      c.classList.forEach((el) => {
        let tagName = c.tagName;
          if (el.startsWith("amountField")) {
            let amountNum = checkCommas(c.value);
            console.log
            switch (tagName) {
              case "INPUT":
                let previousElementClass = c.previousElementSibling.classList;
                let amountParentErrorState = c.parentElement.nextElementSibling;
                if (!amountNum) {
                  c.classList.add("errorInput");
                  previousElementClass.add("errorSpan");
                  amountParentErrorState.textContent = errorStates.get("error");
                } else {
                  mortgageNumbersArray.push(amountNum);
                  c.classList.remove("errorInput");
                  previousElementClass.remove("errorSpan");
                  amountParentErrorState.textContent = "";
                }
              break;
            }
          } else if (el.startsWith("termField")) {
            let termNum = Number(c.value);
            switch (tagName) {
              case "INPUT":
                let nextElementClass = c.nextElementSibling.classList;
                let termParentErrorState = c.parentElement.nextElementSibling;
                if (!termNum) {
                  c.classList.add("errorInput");
                  nextElementClass.add("errorSpan");
                  termParentErrorState.textContent = errorStates.get("error");
                } else {
                  mortgageNumbersArray.push(termNum);
                  c.classList.remove("errorInput");
                  nextElementClass.remove("errorSpan");
                  termParentErrorState.textContent = "";
                }
              break;
            } 
          } else if (el.startsWith("rateField")) {
            let rateNum = Number(c.value);
            switch (tagName) {
              case "INPUT":
                let nextElementClass = c.nextElementSibling.classList;
                let rateParentErrorState = c.parentElement.nextElementSibling;
                if (!rateNum) {
                  c.classList.add("errorInput");
                  nextElementClass.add("errorSpan");
                  rateParentErrorState.textContent = errorStates.get("error");
                } else {
                  mortgageNumbersArray.push(rateNum);
                  c.classList.remove("errorInput");
                  nextElementClass.remove("errorSpan");
                  rateParentErrorState.textContent = "";
                }
              break;
            } 
          }
      });
    }
  }
  return mortgageNumbersArray;
}

//resusable code; if we add more input radios in the future, it is
// not hard-coded
function checkOptions() {
  const options = Array.from(inputValidity).slice(3);
  //returns last element of array
  let last = options.slice(-1);
  let error = last[0].parentElement.nextElementSibling;
  const radioChecked = [];

  for (let d of options) {
    radioChecked.push(d.checked);
  }

  let finalCheck = radioChecked.includes(true);
  finalCheck ? error.textContent = "" : 
              (error.textContent = errorStates.get("error"), 
              error.style.marginTop = "-15px", 
              error.style.marginBottom = "30px");
  return finalCheck;
}

function calculateMortgage(mort) {
  let p = mort.mortAmount;
  let percentToDeci = mort.intRate / 100;
  let r = percentToDeci / 12;
  let n = mort.mortTerm * 12;
  let M = p * [r * (1 + r) ** n] / [(1 + r)**n - 1];
  let total = M * 12 * mort.mortTerm;
  let monthlyPayment = toNumberString(M);
  let totalPayment = toNumberString(total);
  monthyPayments(monthlyPayment);
  totalPayments(totalPayment);
}
function toNumberString(num) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function totalPayments(tot) {
  setTimeout(() => {
    document.getElementById('termPayments').innerHTML =  '£' + tot;
  }, 230)
}
function monthyPayments(month) {
  setTimeout(() => {
    document.getElementById('monthlyPayments').innerHTML = '£' + month;
  },230);
}
function removeDisplayResults() {
  let hasRun = false;
  if (!hasRun) {
    document.getElementById('resultsEmptyField').remove();
    hasRun = true;
    return hasRun;
  }
}

function displayResults(parentId, tagName, items) {
  removeDisplayResults();
  const granpaElement = document.getElementById('results');
  const parentElement = document.createElement(tagName);
  granpaElement.appendChild(parentElement);
  parentElement.setAttribute('id', parentId);
  parentElement.setAttribute('class', "pt-4 mx-2");
  function checkArrayInObjects(arr) {
    return arr.some(element => Object.values(element).some(e => Array.isArray(e)));
  }
  for (let item of items) {
    const childElement = document.createElement(item.element);
    if (!item.id) {
      childElement.setAttribute('class', item.class);
    } else {
      childElement.setAttribute('class', item.class);
      childElement.setAttribute('id', item.id);
    }
    if(item.element !== "section") {
      childElement.appendChild(document.createTextNode(item.content));
    } 
    else {
      if (checkArrayInObjects(items)) {
        //I needed to set a Timeout method so I can get the ID of each parent element
        setTimeout(() => {
          const resultsField = document.getElementById('resultsField');
          const content = item.content;
          //console.log(item);
          for (let c of content) {
            const grandChildElement = document.createElement(c.element);
            resultsField.appendChild(grandChildElement);
            if (!c.id) {
              grandChildElement.setAttribute('class', c.class);
            } else if (!c.class) {
              grandChildElement.setAttribute('id', c.id);
            }
            else {
              grandChildElement.setAttribute('class', c.class);
              grandChildElement.setAttribute('id', c.id);
            }
            if (c.element !== 'div') {
              grandChildElement.appendChild(document.createTextNode(c.content));
            } 
            else {
              if(checkArrayInObjects(content)) {
                setTimeout(() => {
                  //console.log(c);
                  const monthyPaymentField = document.getElementById('monthyPaymentField');
                  const monthyPayment = c.content;
                  for (let paymentNumbers of monthyPayment) {
                    const grandGrandChildElement = document.createElement(paymentNumbers.element);
                    monthyPaymentField.appendChild(grandGrandChildElement);
                    if(!paymentNumbers.id) {
                      grandGrandChildElement.setAttribute('class', paymentNumbers.class);
                      grandGrandChildElement.appendChild(document.createTextNode(paymentNumbers.content));
                    } else {
                      grandGrandChildElement.setAttribute('class', paymentNumbers.class);
                      grandGrandChildElement.setAttribute('id', paymentNumbers.id);
                      grandGrandChildElement.appendChild(document.createTextNode(paymentNumbers.content));
                    }
                  }
                },100)
              }
            }
          }
        }, 100)
      }
    }
    parentElement.appendChild(childElement);
  }
}