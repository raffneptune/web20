const darkModeBtn = document.getElementById("dark-mode-btn");
const copyBtn = document.getElementById("copy-btn");

darkModeBtn.addEventListener("change", () => {
  if (darkModeBtn.checked) {
    document.body.classList.add("dark");
    copyBtn.src = "images/copywhite.png";
  } else {
    document.body.classList.remove("dark");
    copyBtn.src = "images/copy.png";
  }
});

const lengthInput = document.getElementById("length-input");
const lengthSlider = document.getElementById("length-slider");

lengthInput.addEventListener("input", () => {
  lengthSlider.value = lengthInput.value;
  // generate on length change
  generatePassword();
});

lengthSlider.addEventListener("input", () => {
  lengthInput.value = lengthSlider.value;
  // generate on length change
  generatePassword();
});

const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const generateBtn = document.getElementById("generate-btn");
const passwordDisplay = document.getElementById("password-display");

// generate on option change
uppercaseCheck.addEventListener("change", () => {
  generatePassword();
});
lowercaseCheck.addEventListener("change", () => {
  generatePassword();
});
numbersCheck.addEventListener("change", () => {
  generatePassword();
});
symbolsCheck.addEventListener("change", () => {
  generatePassword();
});

//function to get random lower , upper , number or symbol in a array
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// function to get random lowercase charcter

function getRandomLower() {
  //we can store all chars in a variable and choose one randomly
  //but the other way and I think neat and easy is
  // it uses charcode to get a random lowercase
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  //same with upper case with some change
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  //same with number with some change
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  //for symbols we need to use that method
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  //store all the symbols then return a random
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// we can get random chracter from these function now lets create function to generate pass

function generatePassword() {
  // get value of all 4 checkboxes
  const lower = lowercaseCheck.checked;
  const upper = uppercaseCheck.checked;
  const number = numbersCheck.checked;
  const symbol = symbolsCheck.checked;
  const length = lengthInput.value;

  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  // getting the selected options

  if (typesCount === 0) {
    // if no checkbox selected
    passwordDisplay.value = " Please select atleast one option below...";
    return;
  }
  // if tleast one is checked
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      // get function name of selected options
      // run that function which will give a random char the add in generated password variable
      generatedPassword += randomFunc[funcName]();
    });
  }
  // slice it to make equal to length
  const finalPassword = generatedPassword.slice(0, length);
  // update display
  passwordDisplay.value = finalPassword;
}

// run the function on startup

generatePassword();

//generate on button click
generateBtn.addEventListener("click", () => {
  generatePassword();
});

//copy button to copy passwrod

copyBtn.addEventListener("click", () => {
  const password = passwordDisplay.value;

  // return if nothing is in password input
  if (!password) {
    return;
  }

  // create a texarea on page then add value yo text area then copy that
  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
