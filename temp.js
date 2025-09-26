const apikey = "ab526cb268db89e0052129d41519dfdf";     // open weather map key
const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";   //  open weather map url

var searchbox = document.querySelector(".search input");    //search box
var btn = document.querySelector(".search button");         // search button
const weathericon = document.querySelector(".weather-icon")    // weather image

async function checkweather(city) {

    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {     // for invalid city name
        city = "Pune";
        document.querySelector(".error h4").style.display = "block";
        searchbox.classList.add("err");
        setTimeout(() => {
            searchbox.classList.remove("err");
            document.querySelector(".error h4").style.display = "none";
            searchbox.value = "";
        }, 1000);
    }

    else if (!city) {    //  for empty city name
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

btn.addEventListener("click", () => {    // search button click events
    checkweather(searchbox.value);
});

window.addEventListener("load", () => {        // default city for weather details
    checkweather("Pune");
});


// Code By - Datta Kale  now the first stage is working means it is taking the input and after that when clicking on the get recommendation it should use the above apikey to give the information temperature, pressure, wind speed, description in a tabular form 