const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const forecastMarkup = document.querySelector('.forecast');
const locationMarkup = document.querySelector('.location');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?location=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          return (forecastMarkup.textContent = data.error);
        }
        forecastMarkup.textContent = data.forecast;
        locationMarkup.textContent = data.location;
      });
    }
  );
});
