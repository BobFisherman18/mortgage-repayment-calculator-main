const amountInput = document.getElementById('amount');
const amountSpan = document.getElementById('currency');
const errorFields = document.querySelectorAll('p.errorStates');

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

amountInput.addEventListener('mouseenter', mouseEnter);
amountInput.addEventListener('mouseleave', mouseLeave);

function mouseEnter() {
    amountInput.style.borderColor = hoverStates.get('slate900');
    amountSpan.style.borderColor = hoverStates.get('slate900');
}

function mouseLeave() {
    amountInput.style.borderColor = noErrors.get('slate500');
    amountSpan.style.borderColor = noErrors.get('slate500');
}

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    console.log(forms);
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
          err
        form.classList.add('was-validated')
      }, false)
    })
  })()