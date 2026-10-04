# Weather Dashboard

A real-time weather dashboard built using HTML, CSS, and JavaScript.

## 🌐 Live Demo
Check out the live application here: [Weather Dashboard](https://sadhana-0726.github.io/Weather-Dashboard/)

## Features

* Search weather by city name
* Fetches real-time weather data using REST APIs
* Uses JavaScript Fetch API
* Uses async/await for asynchronous operations
* Processes JSON responses
* Displays temperature
* Displays humidity
* Displays wind speed
* Displays feels-like temperature
* Displays weather condition
* Handles invalid city names
* Handles empty search input
* Responsive design for mobile and desktop

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Fetch API
* REST API
* Open-Meteo API

## API Flow

The application first uses the Open-Meteo Geocoding API to convert the city name into latitude and longitude.

The coordinates are then used with the Open-Meteo Weather API to retrieve current weather information.

```text
City Name
    ↓
Geocoding API
    ↓
Latitude + Longitude
    ↓
Weather API
    ↓
JSON Response
    ↓
JavaScript Processing
    ↓
Dynamic Weather Dashboard
```

## Error Handling

The application handles:

* Empty city input
* Invalid city names
* Failed API requests
* Unexpected API errors

## How to Run

1. Download or clone the project.
2. Open the project in VS Code.
3. Open `index.html` using Live Server.
4. Enter a city name.
5. Click Search or press Enter.

## Project Structure

```text
weather-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```
