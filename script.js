let now = new Date();
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let dateandtime = document.querySelector(".time-and-date");
dateandtime.innerHTML = `${
	days[now.getDay()]
} ${now.getHours()}:${now.getMinutes()}`;
//returns the current day of the week and time

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let dow = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

	return dow[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;
	forecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`
				<div class="col-2">
					<div class="forecastdayoftheweek">${formatDay(forecastDay.dt)}</div>
					<img
						src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
						alt=""
						width="42"
					/>
					<div class="forecast-tempranges">
						<span class="tempmax">
							${Math.round(forecastDay.temp.max)}°
						</span>
						<span class="tempmin">
							${Math.round(forecastDay.temp.min)}°
						</span>
					</div>
				</div>
			`;
		}
	});

	forecastHTML = forecastHTML + `</div>`; //this div ends
	forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	console.log(apiURL);
	axios.get(apiURL).then(displayForecast);
}

function weather(response) {
	document.querySelector("h2").innerHTML = response.data.name;
	//returns the location name

	document.querySelector(".theweather").innerHTML =
		response.data.weather[0].main;
	//returns the weather in text. EX: Sunny, Rainy, Cloudy

	let iconE = document.querySelector("#icon");
	iconE.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	icon.setAttribute("alt", response.data.weather[0].description);
	//changes the weather icon

	document.querySelector(".tempdigits").innerHTML = Math.round(
		response.data.main.temp
	);
	//the above provides the actual temperature number WITHOUT taking away the C and F

	let howhumid = response.data.main.humidity;
	document.querySelector(".theHumidity").innerHTML = `${howhumid}`;
	//the above provides the humidity value

	let velocityofwind = response.data.wind.speed;
	document.querySelector(".windSpeed").innerHTML = ` ${velocityofwind}`;
	//the above provides the wind speed

	getforecast(response.data.coord);
}

function searchlocation(position) {
	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let lat = position.coords.latitude;
	let long = position.coords.longitude;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(weather);
}
//associated with current location

function currentlocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(searchlocation);
}
//the above two functions give me the current position weather

function lightblue(city) {
	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(weather);
}
function darkblue(event) {
	event.preventDefault();
	let city = document.querySelector("#search-text-input").value;
	lightblue(city);
}
//the above two functions changes the LOCATION H2 to whatever I typed

function conversionCtoF(event) {
	//since it is C to F this means I am pressing Degrees F
	let initial = document.querySelector(".tempdigits").innerHTML;
	let fahrenheit = initial * (9 / 5) + 32;
	let fdegrees = Math.round(fahrenheit);
	document.querySelector(".tempdigits").innerHTML = fdegrees;
}

function conversionFtoC(event) {
	//since it is F to C this means I am pressing Degrees C
	let initialvalue = document.querySelector(".tempdigits").innerHTML;
	let celsius = (5 / 9) * (initialvalue - 32);
	let cdegrees = Math.round(celsius);
	document.querySelector(".tempdigits").innerHTML = cdegrees;
}

let thebutton = document.querySelector("button");
thebutton.addEventListener("click", currentlocation);

let bluebutton = document.querySelector("#search-form");
bluebutton.addEventListener("submit", darkblue);
//this is attached to BLUE BUTTON

let cell = document.querySelector(".ren-to-cel");
cell.addEventListener("click", conversionFtoC);
//this return degrees C when we click on Degrees C

let ren = document.querySelector(".cel-to-ren");
ren.addEventListener("click", conversionCtoF);
//this return degrees F when we click on Degrees F
