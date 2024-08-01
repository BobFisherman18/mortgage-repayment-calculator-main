const errorFields = document.querySelectorAll('p.errorStates');
const inputHoverStates = document.querySelectorAll('.hover');
const inputValidity = document.querySelectorAll("input[type='number'], input[type='radio']");

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
        errorStatesClass();
        break;
      case "radio":
        //console.log("radio:");
       // console.log(z);
       break;
    }
  }
}

function errorStatesClass() {
  const arr = [];
  for (let a in sortedInputs) {
    //console.log(sortedInputs[a]);
    arr.push(sortedInputs[a]);
  }
  //console.log(arr);
  for (let b of arr) {
    console.log(b);
    for (let c of b) {
      let numberValue = Number(c.value);
      let tagName = c.tagName;
      switch (tagName) {
        case "SPAN":
        //console.log(c);
          break;
        case "INPUT":
          //console.log(c);
          if (!numberValue) {
            c.classList.add("errorInput");
            //b.classList.add("errorSpan");
          } else {
            c.classList.remove("errorInput");
          }
          break;
      } 
    }
  }
}
errorStatesClass();
/*
let tagName = a.tagName;
switch (tagName) {
  case "SPAN":
    if (!a.value) {
      a.classList.add("errorSpan");
    } else {
      a.classList.remove("errorSpan");
    }
    break;
  case "INPUT":
    if (!a.value) {
      a.classList.add("errorInput");
    } else {
      a.classList.remove("errorInput");
    }
    break;
}
*/