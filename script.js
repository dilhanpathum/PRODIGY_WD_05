const apiKey = '96a20d75490473f50d9464851b54a08c';
const form = document.getElementById('locationForm');
const cityInput = document.getElementById('cityInput');
const weatherCard = document.getElementById('weatherCard');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    getWeather(city);
    cityInput.value = '';
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === '404') {
      showError('City not found');
      return;
    }

    showWeather(data);
  } catch (error) {
    showError('An error occurred. Please try again later.');
  }
}

function showWeather(data) {
  const { name, weather, main } = data;

  const weatherCardHTML = `
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
    <div class="weather-description">${weather[0].main}</div>
    <div class="weather-details">
      <p>Location: ${name}</p>
      <p>Temperature: ${main.temp}°C</p>
      <p>Humidity: ${main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    </div>
  `;

  weatherCard.innerHTML = weatherCardHTML;
}

function showError(message) {
  weatherCard.innerHTML = `<div class="error">${message}</div>`;
}
