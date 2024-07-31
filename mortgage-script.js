const errorFields = document.querySelectorAll('p.errorStates');
const inputHoverStates = document.querySelectorAll('.hover');
const inputValidity = document.querySelectorAll("input[type='number'], input[type='radio']");
console.log(inputHoverStates);

console.log(errorFields);
const noErrors = new Map([
    ['slate500', 'hsl(200, 26%, 54%)']
]);
const hoverStates = new Map([
    ['slate900', 'hsl(202, 55%, 16%)']
]);
const errorStates = new Map([
  ["error", "This field is required"]

]);

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
    //console.log(inputTypes);
    switch(inputTypes) {
      case "number":
        //console.log("number:");
        console.log(z.value);
        if (z.value === ""){
          errorStatesClass();
        }
        break;
      case "radio":
        //console.log("radio:");
       // console.log(z);
    }
  }
}

function errorStatesClass() {
  for (let a of inputHoverStates) {
    let tagName = a.tagName;
    switch (tagName) {
      case "SPAN":
        a.classList.add("errorSpan");
        break;
      case "INPUT":
        a.classList.add("errorInput");
        break;
    }
  }
}
//errorStatesClass();