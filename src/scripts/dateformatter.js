export function dateformat(input) {
    let formattedInput = input.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  
    if (formattedInput.length >= 6) {
      formattedInput = formattedInput.slice(0, 2) + '.' + formattedInput.slice(2, 6); // Insert dot after month and year
    }
  
    return formattedInput;
  }