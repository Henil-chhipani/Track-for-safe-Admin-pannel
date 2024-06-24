$(document).ready(function () {
  //Preloader
  preloaderFadeOutTime = 1200;
  function hidePreloader() {
    var preloader = $("#loader");
    preloader.fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();
});

const errorText = document.getElementById("error-text");
if (errorText.innerText != "" && errorText.innerText != "undefined") {
  errorText.style.display = "block";
  setTimeout(function () {
    errorText.style.display = "none"
    errorText.innerText = " "
  }, 3000);
} else {
  errorText.style.display = "none";
}

// const form = document.getElementById("form");
// form.addEventListener('submit', (event)=>{
//   event.preventDefault();
// })