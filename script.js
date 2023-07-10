const chooseLocation = document.querySelector(".input-location");
const countryName = document.querySelector(".country");
const cityName = document.querySelector(".city-name");
const regionName = document.querySelector(".region-name");
const showTemperature = document.querySelector(".temperature");
const currentCondition = document.querySelector(".current-condition");
const currentConditionImage = document.querySelector("img");
const errorMessage = document.querySelector(".error-message");
const backgroundColor = document.querySelector(".box-div");

document.querySelector(".submit-button").addEventListener("click", submit);
function submit(e) {
  e.preventDefault();
  fetchData(`http://api.weatherapi.com/v1/current.json?key=68a9fcf0d17d45fbabf93418231007&q=${chooseLocation.value}&aqi=no`)
    .then((res) => showContent(res))
    .catch(() => handleError());
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function showContent(res) {
  errorMessage.textContent = "";
  countryName.textContent = res.location.country;
  cityName.textContent = `${res.location.name},`;
  regionName.textContent = res.location.region;
  showTemperature.textContent = `${res.current.temp_c}°C`;
  currentCondition.textContent = res.current.condition.text;
  currentConditionImage.src = res.current.condition.icon;
  currentConditionImage.style.width = "10rem";
  currentConditionImage.style.height = "10rem";
}

function clearContent() {
  countryName.textContent = "";
  cityName.textContent = "";
  regionName.textContent = "";
  showTemperature.textContent = "";
  currentCondition.textContent = "";
  currentConditionImage.src = "";
}

function handleError() {
  errorMessage.textContent = `"${chooseLocation.value}" does not exist! Watch out for typos.`;
  clearContent();
}
