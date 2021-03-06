// fetch("http://localhost:3000/weather?address=boston").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log("ERROR");
//     } else {
//       console.log(data.location);
//       console.log(data.forecastData);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value; // SEARCH VALUE

  messageOne.textContent = "Loading......";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        (messageOne.textContent = data.location),
          (messageTwo.textContent = data.forecastData);
        //   return (messageTwo.textContent = data.forecastData);
      }
    });
  });
});
