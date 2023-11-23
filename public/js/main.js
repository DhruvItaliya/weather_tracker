const search = document.getElementById('search');
const cityName = document.getElementById('cityName');
let outputCity = document.getElementById('city');
let tempRealVal = document.getElementById('tempRealVal');
let tempStatus = document.getElementById('tempStatus');
let data_hide = document.querySelector('.data_hide');
const day = document.getElementById('day');
const date = document.getElementById('date');
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateObj = new Date();
day.innerHTML = weekDays[dateObj.getDay()];
date.innerHTML = dateObj.getDate() + " " + month[dateObj.getMonth()].toUpperCase();

const getInfo = async (event) => {
    event.preventDefault();

    if (cityName.value === "") {
        outputCity.innerHTML = "Please enter city name"
        outputCity.style.color = "red";
        data_hide.style.visibility = "hidden";
    }
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&&appid=`
        try {
            let rawData = await fetch(url);
            let jsObj = await rawData.json();
            let arrObj = [jsObj];
            tempRealVal.innerHTML = arrObj[0].main.temp.toFixed(1);
            outputCity.style.color = "#fff";
            outputCity.innerHTML = arrObj[0].name + ", " + arrObj[0].sys.country;
            if (arrObj[0].weather[0].main == "Clouds") {
                tempStatus.innerHTML = '<i class="fa-solid fa-cloud"></i>';
            }
            else if (arrObj[0].weather[0].main == "Clear") {
                tempStatus.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>';
            }
            else {
                tempStatus.innerHTML = '<i class="fa-solid fa-smog"></i>';
            }

            data_hide.style.visibility = "visible";

        } catch (error) {
            outputCity.innerHTML = "Please enter city name"
            outputCity.style.color = "red";
            data_hide.style.visibility = "hidden";
        }
    }
}

search.addEventListener('click', getInfo);