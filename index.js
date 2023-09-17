const apikey = "ab526cb268db89e0052129d41519dfdf";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
var searchbox = document.querySelector(".search input");
var btn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon")

async function checkweather(city) {

    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        city = "Pune";
        document.querySelector(".error h4").style.display = "block";
        searchbox.classList.add("err");
        setTimeout(() => {
            searchbox.classList.remove("err");
            document.querySelector(".error h4").style.display = "none";
            searchbox.value = "";
        }, 1000);
    }

    else if (!city) {
        city = "Pune";
        document.querySelector(".emp h4").style.display = "block";
        searchbox.classList.add("err");
        setTimeout(() => {
            searchbox.classList.remove("err");
            document.querySelector(".emp h4").style.display = "none";
        }, 1000);

    }

    else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector(".hum").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = (data.wind.speed + 5).toFixed(2) + " km/h";


        if (data.weather[0].main == "Clouds") {
            weathericon.src = "images/clouds.png";
        }

        else if (data.weather[0].main == "Rain") {
            weathericon.src = "images/rain.png";
        }

        else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "images/drizzle.png";
        }

        else if (data.weather[0].main == "Mist") {
            weathericon.src = "images/mist.png";
        }

        else if (data.weather[0].main == "Clear") {
            weathericon.src = "images/clear.png";
        }

        else if (data.weather[0].main == "Snow") {
            weathericon.src = "images/snow.png";
        }
    }

}


btn.addEventListener("click", () => {
    checkweather(searchbox.value);
});


window.addEventListener("load", () => {
    checkweather("Pune");
});