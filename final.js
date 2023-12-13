<script>
    document.getElementById('search-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            getWeatherData(this.value);
        }
    });

    function getWeatherData(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
            .then(response => response.json())
            .then(data => displayWeatherData(data))
            .catch(error => console.log('Error:', error));
    }

    function displayWeatherData(data) {
        const weatherData = document.getElementById('weather-data');
        weatherData.innerHTML = '';

        const weather = {
            temperature: data.main.temp - 273.15, // Kelvin to Celsius
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            description: data.weather[0].description,
            city: data.name,
            country: data.sys.country
        };

        const dataItem = document.createElement('div');
        dataItem.classList.add('data-item');
        dataItem.innerHTML = `
            <h2>${weather.city}, ${weather.country}</h2>
            <img src="${weather.weatherIcon}" alt="${weather.description}">
            <p><strong>Temperature:</strong> ${weather.temperature.toFixed(1)} &#8451;</p>
            <p><strong>Humidity:</strong> ${weather.humidity}%</p>
            <p><strong>Pressure:</strong> ${weather.pressure} hPa</p>
        `;
        weatherData.appendChild(dataItem);
    }
</script>