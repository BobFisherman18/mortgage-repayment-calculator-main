const errorFields = document.querySelectorAll('p.errorStates');
const inputHoverStates = document.querySelectorAll('.hover');
const inputValidity = document.querySelectorAll("input[type='number'], input[type='radio']");
let text = 'Your results are shown below based on the information you provided.'+ 
            'To adjust the results, edit the form and click '+ "calculate repayments "+ 
            'again.'
//console.log(errorFields);
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
//console.log(sortedInputs);

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
    //console.log(inputTypes);
    switch(inputTypes) {
      case "number":
        //console.log("number:");
        checkNumbers();
        break;
      case "radio":
        //console.log("radio:");
       // console.log(z);
       checkOptions();
       break;
    }
  }
}

function checkNumbers() {
  const arr = [];
  const mortgageNumbersArray = [];
  for (let a in sortedInputs) {
    //console.log(sortedInputs[a]);
    arr.push(sortedInputs[a]);
  }
  //console.log(arr);
  for (let b of arr) {
    //console.log(b);
    for (let c of b) {
      //console.log(c.classList);
      c.classList.forEach((el) => {
        let tagName = c.tagName;
        //console.log(el);
          if (el.startsWith("amountField")) {
            let amountNum = Number(c.value);
            //console.log(tagName);
            switch (tagName) {
              case "INPUT":
                //console.log(c);
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
            //console.log(c);
            let termNum = Number(c.value);
            switch (tagName) {
              case "INPUT":
                //console.log(c);
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
            //console.log(c);
            let rateNum = Number(c.value);
            switch (tagName) {
              case "INPUT":
                //console.log(c);
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
//checkNumbers();

//resusable code; if we add more input radios in the future, it is
// not hard-coded
function checkOptions() {
  //console.log(inputValidity);
  const options = Array.from(inputValidity).slice(3);
  //console.log(options);
  //returns last element of array
  let last = options.slice(-1);
  let error = last[0].parentElement.nextElementSibling;
  //console.log(error);
  const radioChecked = [];

  for (let d of options) {
    radioChecked.push(d.checked);
  }

  //console.log(radioChecked);
  let finalCheck = radioChecked.includes(true);
  //console.log(finalCheck);
  finalCheck ? error.textContent = "" : 
              (error.textContent = errorStates.get("error"), 
              error.style.marginTop = "-15px", 
              error.style.marginBottom = "30px");
  return finalCheck;
}

const mortgageNumbersArray = checkNumbers();
let radio = checkOptions();
let [amount, term, rate] = mortgageNumbersArray;
const mortgage = new mortgageObject(amount, term, rate, radio);
console.log(mortgage);

function calculateMortgage() {
  console.log(mortgage.intRate);
  let p = mortgage.mortAmount;
  let percentToDeci = mortgage.intRate / 100;
  let r = percentToDeci / 12;
  let n = mortgage.mortTerm * 12;
  let M = p * [r * (1 + r) ** n] / [(1 + r)**n - 1];
  console.log(M.toFixed(2));
}
calculateMortgage();

// Results Page
const resultsContent = [
  { element: 'h2', class: 'mb-3', content: 'Your results' },
  { element: 'p', class: 'mb-4', content: changeResultsPage.get('para') },
  { element: "section", class: 'rounded p-3 mb-3 border-top border-4', id: "resultsField",
    content: [
      { element: 'div', class: 'border-bottom border-2', id: 'monthyPaymentField', 
        content: [
          { element: 'h6', class: 'mt-2', content: "Your monthly repayments" },
          { element: 'h1', id: 'monthlyPayments', class: 'mb-3', content: '£5000.35' }
      ]},
      { element: 'h6', class: 'mt-3', content: "Total you'll repay over the term"},
      {element: 'h3', id: 'termPayments', content: '£539,622.26'}
    ]}
];
console.log(resultsContent);
displayResults('resultsCompletedField', 'div', resultsContent);

function displayResults(parentId, tagName, items) {
  document.getElementById('resultsEmptyField').remove();
  const granpaElement = document.getElementById('results');
  const parentElement = document.createElement(tagName);
  granpaElement.appendChild(parentElement);
  parentElement.setAttribute('id', parentId);
  parentElement.setAttribute('class', "pt-4 mx-2");
 // console.log(parentElement);
 function checkArrayInObjects(arr) {
  return arr.some(element => Object.values(element).some(e => Array.isArray(e)));
}
  for (let item of items) {
    //console.log(item);
    //containsNestedArray(items);
    /*
    function checkArrayInObjects(arr) {
      return arr.some(element => 
          typeof element === 'object' && !Array.isArray(element) && 
          Object.values(element).some(value => Array.isArray(value))
      );
  }
  */
    const childElement = document.createElement(item.element);
    if (!item.id) {
      childElement.setAttribute('class', item.class);
    } else {
      childElement.setAttribute('class', item.class);
      childElement.setAttribute('id', item.id);
    }
    if(item.element !== "section") {
      const node = document.createTextNode(item.content);
      childElement.appendChild(node);
      //console.log(childElement);
    } 
    else {
      if (checkArrayInObjects(items)) {
        const resultsField = document.getElementById('resultsField');
        const content = item.content;
        console.log(item);
        for (let c of content) {
          //console.log(c.parentElement);

        }
      }
    }
    parentElement.appendChild(childElement);
  }
  /*
  // Get the parent element
  const parentElement = document.getElementById("results");
  //parentElement.removeAttribute("class");
  const node = document.createTextNode("This is a new paragraph.");
  newElement.appendChild(node);
  parentElement.appendChild(newElement);
  
  // Set the attributes and content
  if (item.id) newElement.id = item.id;
  if (item.class) newElement.className = item.class;
  if (item.content) newElement.textContent = item.content;
  
  // Append the new element to the parent
  parentElement.appendChild(newElement);
  */

}
