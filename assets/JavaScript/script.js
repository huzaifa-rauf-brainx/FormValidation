// funtion to validate first name
function validateFirstName() {
  const firstName = document.getElementById("firstName");
  const errorDiv = document.getElementById("firstNameError");
  const submitBtn = document.getElementById("submitBtn");

  if (firstName.value.trim() == "") {
    errorDiv.textContent = "First Name is required.";
    submitBtn.disabled = true;
  } else {
    errorDiv.textContent = "";
    checkFormValidity();
  }
}
// funtion to validate last name
function validateLastName() {
  const lastName = document.getElementById("lastName");
  const errorDiv = document.getElementById("lastNameError");
  const submitBtn = document.getElementById("submitBtn");

  if (lastName.value.trim() == "") {
    errorDiv.textContent = "Last Name is required.";
    submitBtn.disabled = true;
  } else {
    errorDiv.textContent = "";
    checkFormValidity();
  }
}
// funtion to validate age
function validateAge() {
  const age = document.getElementById("age");
  const errorDiv = document.getElementById("ageError");
  const submitBtn = document.getElementById("submitBtn");

  const ageValue = age.value.trim();

  if (age.value.trim() === "") {
    errorDiv.textContent = "Age is required.";
    submitBtn.disabled = true;
  } else if (ageValue < 0) {
    errorDiv.textContent = "Age cannot be a negative number!";
  } else if (isNaN(ageValue) || ageValue < 18 || ageValue > 151) {
    errorDiv.textContent = "Age must be a number between 18 and 151.";
    submitBtn.disabled = true;
  } else {
    errorDiv.textContent = "";
    checkFormValidity();
  }
}
// funtion to validate email
function validateEmails() {
  const emailInput = document.getElementById("notificationEmail");
  const errorDiv = document.getElementById("emailError");
  const submitBtn = document.getElementById("submitBtn");
  const emails = emailInput.value.split(",").map(e => e.trim()).filter(e => e !== "");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emails.length === 0) {
    errorDiv.textContent = "At least one email is required.";
    submitBtn.disabled = true;
    return;
  }
  for (let email of emails) {
    if (!emailPattern.test(email)) {
      errorDiv.textContent = `"${email}" is not a valid email.`;
      submitBtn.disabled = true;
      return;
    }
  }
  errorDiv.textContent = "";
  checkFormValidity();
}
// funtion to validate password
function validatePassword() {
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("passwordError");
  const submitBtn = document.getElementById("submitBtn");

  if (password.length < 8) {
    errorDiv.textContent = "Password must be at least 8 characters long.";
    submitBtn.disabled = true;
  } else if (!(/[A-Z]/.test(password))) {
    errorDiv.textContent = "Password must have at least one uppercase letter.";
    submitBtn.disabled = true;
  } else if (!(/[a-z]/.test(password))) {
    errorDiv.textContent = "Password must have at least one lowercase letter.";
    submitBtn.disabled = true;
  } else if (!(/[0-9]/.test(password))) {
    errorDiv.textContent = "Password must include at least one number.";
    submitBtn.disabled = true;
  } else {
    errorDiv.textContent = "";
    checkFormValidity();
  }
}
// funtion to validate confirm password
function validateConfirmPassword() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorDiv = document.getElementById("confirmPasswordError");
  const submitBtn = document.getElementById("submitBtn");

  if (password !== confirmPassword) {
    errorDiv.textContent = "Password and Confirm Password must match";
    submitBtn.disabled = true;
  } else {
    errorDiv.textContent = "";
    checkFormValidity();
  }
}
// funtion to validate contact number
function validateContactNumber() {
  const contactInput = document.getElementById("contactNumber").value.trim();
  const errorDiv = document.getElementById("contactNumberError");
  const submitBtn = document.getElementById("submitBtn");
  const contactPattern = /^\d{11}$/;

  if (!contactPattern.test(contactInput)) {
    errorDiv.textContent = "Contact number must be exactly 11 digits.";
    submitBtn.disabled = true;
  } else {
    errorDiv.textContent = "";
    checkFormValidity();
  }
}
// funtion to validate form
function checkFormValidity() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const ageValue = document.getElementById("age").value.trim();
  const emailInput = document.getElementById("notificationEmail").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const contactValue = document.getElementById("contactNumber").value.trim();
  const submitBtn = document.getElementById("submitBtn");

  const emails = emailInput.split(",").map(e => e.trim()).filter(e => e !== "");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allEmailsValid = emails.length > 0 && emails.every(e => emailPattern.test(e));

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
  const passwordsMatch = password === confirmPassword;

  const contactPattern = /^\d{11}$/;
  const isContactValid = contactPattern.test(contactValue);
  if (
    firstName !== "" &&
    lastName !== "" &&
    !isNaN(ageValue) &&
    ageValue >= 18 &&
    ageValue <= 1515 &&
    allEmailsValid &&
    isPasswordValid &&
    passwordsMatch &&
    isContactValid
  ) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = 1;
  } else {
    submitBtn.disabled = true;
  }
}
function successfulSubmit() {
  alert("Application submitted successfully!");
}