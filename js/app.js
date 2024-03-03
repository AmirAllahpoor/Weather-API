const weathercontainer = document.querySelector(".weather");
const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loadedAdd();

  setTimeout(function () {
    if (navigator.onLine === true) {
      loadedRemove();
    } else {
      loadedAdd();
    }
  }, 1000);
});
function searchWeather() {
  const searchInput = document.getElementById("searchInput").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.trim()}&appid=b41d25256016bba6701105dcd9546f68`
  )
    .then((response) => response.json())
    .then((data) => {
      let dataMain = Math.ceil(data.main.temp - 273.15);
      const weatherInfo = document.getElementById("weatherInfo");
      const weatherIcon = document.getElementById("weather-icon");

      weatherInfo.innerHTML = `
          <h2>${data.name} , ${data.sys.country}</h2> 
          <p>Weather : ${data.weather[0].main}</p>
          <p>Temp : ${dataMain} C</p>`;

          console.log(data)

      if (data.weather[0].main === "Clouds") {
        weatherIcon.innerHTML = `<img src="img-of-weather-api/Cloudy.png">`;
      } else if (data.weather[0].main === "Clear") {
        weatherIcon.innerHTML = `<img src="img-of-weather-api/Sunny.png">`;
      } else if (
        data.weather[0].main === "Fog" ||
        data.weather[0].main === "Haze"
      ) {
        weatherIcon.innerHTML = `<img src="img-of-weather-api/foggy.png">`;
      } else if (data.weather[0].main === "Mist") {
        weatherIcon.innerHTML = `<img src="img-of-weather-api/windy.png">`;
      } else if (
        data.weather[0].main === "Rain" ||
        data.weather[0].main === 'Drizzle'
      ) {
        weatherIcon.innerHTML = `<img src="img-of-weather-api/rain.png">`;
      } else if (data.weather[0].main === "Snow") {
        weatherIcon.innerHTML = `<img src="img-of-weather-api/snow.png">`;
      }
      loadedAdd();
      setTimeout(function () {
        loadedRemove();
      }, 400);
      input.value = "";
    })
    .catch(() => {
      input.value = "";
      alert("Error : This Country Or City Can Not Be Found!! Or Your Internet Is OFfline");
      console.error("Error : This Country Or City Can Not Be Found!! Or Your Internet Is OFfline");
    });
}

let input = document.getElementById("searchInput");

input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    searchWeather();
  }
});
    
function loadedAdd() {
  loader.classList.add("active");
  weathercontainer.classList.add("active");
}
function loadedRemove() {
  loader.classList.remove("active");
  weathercontainer.classList.remove("active");
}
