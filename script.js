window.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
    const weatherElement = document.getElementById('weather');
    const iconElement = document.getElementById('img');
    const cityElement = document.getElementById('city');
    const cityForm = document.getElementById('cityForm');
    const cityInput = document.getElementById('cityInput');

    const getWeather = (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod === 200) { 
                    const temperature = data.main.temp;
                    const description = data.weather[0].description;
                    const icon = data.weather[0].icon;

                    cityElement.innerText = `${data.name} (Страна: ${data.sys.country})`;
                    iconElement.src = `https://openweathermap.org/img/wn/${icon}.png`;
                    weatherElement.innerHTML = `
                        Текущая температура: ${temperature}°C<br>
                        Описание: ${description}`;
                } else {
                    weatherElement.innerHTML = `Ошибка: ${data.message}`;
                    cityElement.innerText = '';
                    iconElement.src = '';
                }
            })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
                weatherElement.innerHTML = 'Не удалось получить данные о погоде.';
            });
    };
    cityForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert('Пожалуйста, введите название города.');
        }
    });

    getWeather('lvov');
});
