const cityDropdown = document.getElementById("city-dropdown");
const btn = document.getElementById("btn");
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

btn.addEventListener("click", () => {
    const city = cityDropdown.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please select a city.");
    }
});

function getWeather(city) {
    console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7b94d055af0802d628aa32a4ee3c309`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.cod === 200) {
                
                const iconCode = data.weather[0].icon;
                icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/>`;

                
                const weatherCity = data.name;
                const weatherCountry = data.sys.country;
                weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

                
                const temp = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
                temperature.innerHTML = `${temp}°C`;

                
                const weatherDesc = data.weather[0].description;
                description.innerHTML = weatherDesc;
            } else {
                
                icon.innerHTML = "";
                weather.innerHTML = "City not found!";
                temperature.innerHTML = "";
                description.innerHTML = "";
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            icon.innerHTML = "";
            weather.innerHTML = "Error fetching data!";
            temperature.innerHTML = "";
            description.innerHTML = "";
        });
}
