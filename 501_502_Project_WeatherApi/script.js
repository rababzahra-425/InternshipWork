const apiKey = "5eddb55930eab9b04bcfd26205f32158";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weather = document.getElementById("weather");

// Search button click
searchBtn.addEventListener("click", getWeather);

// Enter key support
cityInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

// async function getWeather() {

//     const city = cityInput.value.trim();

//     if (city === "") {
//         weather.innerHTML = `
//             <p class="message" style="color:red;">
//                 Please enter a city name.
//             </p>
//         `;
//         return;
//     }

//     weather.innerHTML = `
//         <p class="message">
//             Loading...
//         </p>
//     `;

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     try {

//         const response = await fetch(url);

//         const data = await response.json();

//         if (data.cod != 200) {

//             weather.innerHTML = `
//                 <p class="message" style="color:red;">
//                     City not found.
//                 </p>
//             `;

//             return;
//         }

//         weather.innerHTML = `

//             <h2 class="city">
//                 📍 ${data.name}, ${data.sys.country}
//             </h2>

//             <img
//                 class="weather-icon"
//                 src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
//                 alt="Weather Icon"
//             >

//             <h1 class="temp">
//                 ${Math.round(data.main.temp)}°C
//             </h1>

//             <p class="description">
//                 ${data.weather[0].description}
//             </p>

//             <div class="info">

//                 <div>
//                     <h3>💧 Humidity</h3>
//                     <p>${data.main.humidity}%</p>
//                 </div>

//                 <div>
//                     <h3>🌬 Wind</h3>
//                     <p>${data.wind.speed} m/s</p>
//                 </div>

//             </div>

//         `;

//     } catch (error) {

//         weather.innerHTML = `
//             <p class="message" style="color:red;">
//                 Something went wrong.
//             </p>
//         `;

//         console.log(error);
//     }
// }

async function getWeather() {

    const city = cityInput.value.trim();

    // Remove previous error state
    cityInput.classList.remove("error-input");

    if (city === "") {

        cityInput.classList.add("error-input");

        weather.innerHTML = `
            <div class="error">
                <h3>⚠ Input Required</h3>
                <p>Please enter a city name.</p>
            </div>
        `;

        return;
    }

    // Loading state
    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    weather.innerHTML = `
        <p class="message">
            Loading...
        </p>
    `;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        if (data.cod != 200) {

            cityInput.classList.add("error-input");

            weather.innerHTML = `
                <div class="error">
                    <h3>❌ City Not Found</h3>
                    <p>Please check the spelling and try again.</p>
                </div>
            `;

            return;
        }

        weather.innerHTML = `

            <h2 class="city">
                📍 ${data.name}, ${data.sys.country}
            </h2>

            <img
                class="weather-icon"
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                alt="Weather Icon"
            >

            <h1 class="temp">
                ${Math.round(data.main.temp)}°C
            </h1>

            <p class="description">
                ${data.weather[0].description}
            </p>

            <div class="info">

                <div>
                    <h3>💧 Humidity</h3>
                    <p>${data.main.humidity}%</p>
                </div>

                <div>
                    <h3>🌬 Wind</h3>
                    <p>${data.wind.speed} m/s</p>
                </div>

            </div>

        `;

    }
    catch (error) {

        weather.innerHTML = `
            <div class="error">
                <h3>⚠ Network Error</h3>
                <p>Something went wrong. Please try again later.</p>
            </div>
        `;

        console.log(error);

    }
    finally {

        searchBtn.disabled = false;
        searchBtn.textContent = "Search";

    }

}