document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const submitBtn = document.getElementById("submitBtn");
  const NAME_REGEX = /^[A-Za-z\s'-]+$/;
  const EMAIL_REGEX = /^[^@\s]+@[^@.\s]+\.[a-zA-Z]{2,}$/;
  const CONTACT_REGEX = /^\d{11}$/;
  const MIN_PASSWORD_LENGTH = 8;
  const AGE_MIN = 18;
  const AGE_MAX = 151;
  function showError(input, message) {
    const errorDiv = document.getElementById(`${input.id}Error`);
    if (errorDiv) errorDiv.textContent = message;
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
  function showSuccess(input) {
    const errorDiv = document.getElementById(`${input.id}Error`);
    if (errorDiv) errorDiv.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }
  function validateInput(input) {
    if (!input) return false;
    const value = input.value.trim();
    switch (input.id) {
      case "firstName":
      case "lastName":
        if (value === "") {
          showError(input, `${input.id === "firstName" ? "First" : "Last"} Name is required.`);
          return false;
        }
        if (!NAME_REGEX.test(value)) {
          showError(input, `${input.id === "firstName" ? "First" : "Last"} Name can only contain letters.`);
          return false;
        }
        showSuccess(input);
        return true;
      case "age":
        const age = parseInt(value);
        if (value === "") {
          showError(input, "Age is required.");
          return false;
        }
        if (isNaN(age) || age < AGE_MIN || age > AGE_MAX) {
          showError(input, `Age must be between ${AGE_MIN} and ${AGE_MAX}.`);
          return false;
        }
        showSuccess(input);
        return true;
      case "notificationEmail":
        const emails = value.split(",").map(e => e.trim()).filter(e => e !== "");
        if (emails.length === 0) {
          showError(input, "At least one email is required.");
          return false;
        }
        for (let email of emails) {
          if (!EMAIL_REGEX.test(email)) {
            showError(input, `"${email}" is not a valid email.`);
            return false;
          }
        }
        showSuccess(input);
        return true;
      case "password":
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasDigit = /\d/.test(value);

        if (value.length < MIN_PASSWORD_LENGTH) {
          showError(input, `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
          return false;
        }
        if (!hasUpper || !hasLower || !hasDigit) {
          showError(input, "Must include uppercase, lowercase, and number.");
          return false;
        }
        showSuccess(input);
        return true;
      case "confirmPassword":
        const passwordVal = document.getElementById("password").value.trim();
        if (value !== passwordVal) {
          showError(input, "Passwords do not match.");
          return false;
        }
        showSuccess(input);
        return true;
      case "contactNumber":
        if (!/^\d+$/.test(value)) {
          showError(input, "Contact number must contain digits only");
          return false;
        }
        if (!CONTACT_REGEX.test(value)) {
          showError(input, "Contact number must be exactly 11 digits.");
          return false;
        }
        showSuccess(input);
        return true;
      default:
        return true;
    }
  }
  function isFormValid() {
    const inputs = form.querySelectorAll("input:not([type=hidden]):not([type=submit])");
    return Array.from(inputs).every(input => validateInput(input));
  }
  form.addEventListener("blur", (e) => {
    if (e.target.tagName === "INPUT") {
      validateInput(e.target);
      submitBtn.disabled = !isFormValid();
      submitBtn.style.opacity = submitBtn.disabled ? "0.5" : "1";
      submitBtn.style.cursor = submitBtn.disabled ? "not-allowed" : "pointer";
    }
  }, true);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    const inputs = form.querySelectorAll("input:not([type=hidden]):not([type=submit])");
    inputs.forEach(input => {
      const valid = validateInput(input);
      if (!valid) allValid = false;
    });
    if (allValid) {
      alert("Application submitted successfully!");
    }
  });
});