const successText = document.getElementById("success-message");
if (successText.innerText != "" && successText.innerText != "undefined") {
    successText.style.display = "block";
  setTimeout(function () {
    successText.style.display = "none"
    successText.innerText = " "
  }, 3000);
} else {
    successText.style.display = "none";
}


const errorText = document.getElementById("error-message");
if (errorText.innerText != "" && errorText.innerText != "undefined") {
  errorText.style.display = "block";
  setTimeout(function () {
    errorText.style.display = "none"
    errorText.innerText = " "
  }, 3000);
} else {
  errorText.style.display = "none";
}

const form = document.getElementById("form");
form.addEventListener('submit', (event) => {
  event.preventDefault();
})