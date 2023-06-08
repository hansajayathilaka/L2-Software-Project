// Get the input field element
const nameInput = document.querySelector('fname');

// Define a regular expression pattern for a valid name
const namePattern = /^[A-Za-z]{2,}$/;

// Add an event listener to the input field to check for input changes
nameInput.addEventListener('input', () => {
  // Get the value of the input field
  const name = nameInput.value.trim();
  
  // Check if the name matches the pattern
  if (namePattern.test(name)) {
    // The name is valid
    nameInput.classList.remove('invalid');
    nameInput.classList.add('valid');
  } else {
    // The name is invalid
    nameInput.classList.remove('valid');
    nameInput.classList.add('invalid');
  }
});