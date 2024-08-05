const errorFields = document.querySelectorAll('p.errorStates');
const inputHoverStates = document.querySelectorAll('.hover');
const inputValidity = document.querySelectorAll("input[type='number'], input[type='radio']");
let text = 'Your results are shown below based on the information you provided.'+ 
            'To adjust the results, edit the form and click '+ "calculate repayments "+ 
            'again.'
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
  for (let x of inputStates) {
    x.addEventListener('mouseenter', () => {
        for (let i of inputStates) {
          i.style.borderColor = hoverStates.get('slate900');
      }
    });
    x.addEventListener('mouseleave', () => {
      for (let i of inputStates) {
        i.style.borderColor = noErrors.get('slate500');
      }

    });
  }
}
hover(sortedInputs.amount);
hover(sortedInputs.term);
hover(sortedInputs.rate);

function checkFields() {
  for (let z of inputValidity) {
    let inputTypes = z.type;
    switch(inputTypes) {
      case "number":
        checkNumbers();
        break;
      case "radio":
       checkOptions();
       break;
    }
  }
  createMortgageObject();
  displayResults('resultsCompletedField', 'div', resultsContent);
}
function createMortgageObject() {
  const mortgageNumbersArray = checkNumbers();
  let radio = checkOptions();
  let [amount, term, rate] = mortgageNumbersArray;
  const mortgage = new mortgageObject(amount, term, rate, radio);
  console.log(mortgage);
  calculateMortgage(mortgage);
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
            let amountNum = Number(c.value);
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

async function calculateMortgage(mort) {
  let p = mort.mortAmount;
  let percentToDeci = mort.intRate / 100;
  let r = percentToDeci / 12;
  let n = mort.mortTerm * 12;
  let M = p * [r * (1 + r) ** n] / [(1 + r)**n - 1];
  let monthlyPayment = M.toFixed(2);
  document.getElementById("monthlyPayments").innerHTML = await myPromise;
}

// Results Page
const resultsContent = [
  { element: 'h2', class: 'mb-3', content: 'Your results' },
  { element: 'p', class: 'mb-4', content: changeResultsPage.get('para') },
  { element: "section", class: 'rounded p-3 mb-3 border-top border-4', id: "resultsField",
    content: [
      { element: 'div', class: 'border-bottom border-2', id: 'monthyPaymentField', 
        content: [
          { element: 'h6', class: 'mt-2', content: "Your monthly repayments" },
          { element: 'h1', id: 'monthlyPayments', class: 'mb-3', content: `${calculateMortgage(mortgage)}` }
      ]},
      { element: 'h6', class: 'mt-3', content: "Total you'll repay over the term"},
      {element: 'h3', id: 'termPayments', content: '£539,622.26'}
    ]}
];

function displayResults(parentId, tagName, items) {
  document.getElementById('resultsEmptyField').remove();
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
          console.log(item);
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
                  console.log(c);
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
                },500)
              }
            }
          }
        }, 500)
      }
    }
    parentElement.appendChild(childElement);
  }
}
