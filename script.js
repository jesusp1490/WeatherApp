const apiKey = "9bfc62c6f7e745d558970cebeeea4df7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather i');
const errorDiv = document.querySelector('.error');
const weatherDiv = document.querySelector('.weather');
const bgImage = document.querySelector('.bg-image');
const bgImageCity = document.querySelector('.background-image');
const cityDiv = document.querySelector('.city');
const tempDiv = document.querySelector('.temp');
const humidityDiv = document.querySelector('.humidity');
const windDiv = document.querySelector('.wind');

function checkWeather(weather) {
	switch (weather) {
		case 'clear':
			return 'bi-brightness-high-fill';
		case 'clouds':
			return 'bi-clouds-fill';
		case 'rain':
			return 'bi-cloud-rain-fill';
		case 'snow':
			return 'bi-cloud-snow-fill';
		case 'thunderstorm':
			return 'bi-cloud-lightning-rain-fill';
		case 'drizzle':
			return 'bi-cloud-drizzle-fill';
		case 'mist':
			return 'bi-cloud-sun-fill';
		default:
			return 'bi-question-diamond-fill';
	}
}

async function getCurrentWeather(city) {
	try {
		const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
		const data = await response.json();

		if (response.status == 404) {
			errorDiv.style.display = "block";
			weatherDiv.style.display = "none";
		} else {
			cityDiv.innerHTML = data.name;
			tempDiv.innerHTML = Math.round(data.main.temp) + "º";
			humidityDiv.innerHTML = data.main.humidity + "%";
			windDiv.innerHTML = data.wind.speed + "km/h";
			bgImage.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${data.name})`;
			bgImageCity.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${city}")`;

			const iconClass = checkWeather(data.weather[0].main.toLowerCase());
			weatherIcon.className = '';
			weatherIcon.classList.add('bi', iconClass);

			errorDiv.style.display = "none";
			weatherDiv.style.display = "block";
		}
	} catch (error) {
		console.log(error);
		errorDiv.style.display = "block";
		weatherDiv.style.display = "none";
	}
}

searchBtn.addEventListener("click", () => {
	getCurrentWeather(searchBox.value);
});

searchBox.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		getCurrentWeather(searchBox.value);
	}
});