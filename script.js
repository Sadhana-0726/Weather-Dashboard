const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const weatherDescription =
    document.getElementById("weatherDescription");

function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Foggy",
        51: "Light Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",
        61: "Light Rain",
        63: "Rain",
        65: "Heavy Rain",
        71: "Light Snow",
        73: "Snow",
        75: "Heavy Snow",
        80: "Rain Showers",
        81: "Rain Showers",
        82: "Heavy Rain Showers",
        95: "Thunderstorm",
        96: "Thunderstorm with Hail",
        99: "Thunderstorm with Hail"
    };

    return weatherCodes[code] || "Unknown Weather";
}

async function getWeather(city) {
    try {
        errorMessage.textContent = "";
        weatherCard.classList.add("hidden");
        loading.classList.remove("hidden");

        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) {
            throw new Error("Unable to find the city.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error(
                "City not found. Please enter a valid city name."
            );
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        const locationName = location.name;
        const country = location.country;

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);

        if (!weatherResponse.ok) {
            throw new Error(
                "Unable to fetch weather information."
            );
        }

        const weatherData = await weatherResponse.json();

        const currentWeather = weatherData.current;

        const currentTemperature =
            currentWeather.temperature_2m;

        const currentHumidity =
            currentWeather.relative_humidity_2m;

        const currentWindSpeed =
            currentWeather.wind_speed_10m;

        const currentFeelsLike =
            currentWeather.apparent_temperature;

        const currentWeatherCode =
            currentWeather.weather_code;

        cityName.textContent = locationName;
        countryName.textContent = country;

        temperature.textContent =
            Math.round(currentTemperature);

        humidity.textContent =
            currentHumidity;

        windSpeed.textContent =
            currentWindSpeed;

        feelsLike.textContent =
            Math.round(currentFeelsLike);

        weatherDescription.textContent =
            getWeatherDescription(currentWeatherCode);

        weatherCard.classList.remove("hidden");

    } catch (error) {
        errorMessage.textContent =
            error.message ||
            "Something went wrong. Please try again.";

    } finally {
        loading.classList.add("hidden");
    }
}

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent =
            "Please enter a city name.";

        weatherCard.classList.add("hidden");

        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

getWeather("Chennai");