import React, { useState, useEffect } from "react";
import "./search.css";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import "./styles.css";

const weatherIconMap = {
  "01d": "CLEAR_DAY",
  "01n": "CLEAR_NIGHT",
  "02d": "PARTLY_CLOUDY_DAY",
  "02n": "PARTLY_CLOUDY_NIGHT",
  "03d": "CLOUDY",
  "03n": "CLOUDY",
  "04d": "CLOUDY",
  "04n": "CLOUDY",
  "09d": "RAIN",
  "09n": "RAIN",
  "10d": "RAIN",
  "10n": "RAIN",
  "11d": "SLEET",
  "11n": "SLEET",
  "13d": "SNOW",
  "13n": "SNOW",
  "50d": "FOG",
  "50n": "FOG",
};

const iconColors = {
  CLEAR_DAY: "goldenrod",
  CLEAR_NIGHT: "darkblue",
  PARTLY_CLOUDY_DAY: "lightgray",
  PARTLY_CLOUDY_NIGHT: "darkgray",
  CLOUDY: "gray",
  RAIN: "blue",
  SLEET: "lightblue",
  SNOW: "lightblue",
  FOG: "lightgray",
};
const forecastData = [
  { day: "Mon", icon: "CLEAR_DAY", iconColor: "darkblue", tempMin: 12, tempMax: 18 },
  { day: "Tue", icon: "RAIN", iconColor: "darkblue", tempMin: 10, tempMax: 15 },
  { day: "Wed", icon: "CLOUDY", iconColor: "darkblue", tempMin: 8, tempMax: 14 },
  { day: "Wed", icon: "CLOUDY", iconColor: "darkblue", tempMin: 8, tempMax: 14 },
  { day: "Wed", icon: "CLOUDY", iconColor: "darkblue", tempMin: 8, tempMax: 14 },

];
const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-GB', {
    weekday: 'long', // Pl.: Monday, Tuesday, stb.
    hour: '2-digit', // 2 számjegyű óra
    minute: '2-digit', // 2 számjegyű perc
    hour12: false, // 24 órás formátum
  });
  let time = formattedDate
function Search(props) {
  let [city, setCity] = useState("Győr");
  let [searchCity, setSearchCity] = useState("Győr");
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState("");
  let [humidityWind, setHumidityWind] = useState("");
  let [emoji, setEmoji] = useState("");
  let [iconColor, setIconColor] = useState("goldenrod");
  
  
  function showTemperature(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidityWind(
      <div>
        Humidity: <span className="link">
          {response.data.main.humidity} %
        </span>, 
        Wind: <span className="link">{response.data.wind.speed} km/h</span>
      </div>
    );
    setEmoji(response.data.weather[0].icon);
    const weatherIcon = response.data.weather[0].icon;
    const iconName = weatherIconMap[weatherIcon];
    setIconColor(iconColors[iconName]);
  }

  useEffect(() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=c5f0e59acac64258bb92ed027d20c68f&units=metric`;

    axios
      .get(url)
      .then(showTemperature)
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [searchCity]);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchCity(city);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="containerMain">
    <div className="search">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Type a city.."
            className="inputLine"
            type="search"
            onChange={updateCity}
          />
          <input className="button" type="submit" value="Search" />
        </form>
        <div className="side">
          <div className="city">
            {capitalizeFirstLetter(searchCity)}
            <br />
            <div className="WeatherData">
              {time}, {description}
              {humidityWind}
            </div>
          </div>
   
          <div className="temperature">
  <div className="emoji">
    <ReactAnimatedWeather
      icon={weatherIconMap[emoji]}
      color={iconColor}
      size={32}
      animate={true}
    />
  </div>
  <div className="tempNumber">
    {temperature}
    <span className="celsius">°C</span>
  </div>
</div>
        </div>
      </div>
      <div className="forecastContainer">
      {forecastData.map((data, index) => (
        <div className="forecast" key={index}>
          <div className="dayForecast">{data.day}</div>
          <div className="emojiForecast">
          <ReactAnimatedWeather
              icon={data.icon}
              color={data.iconColor}
              size={36}
              animate={true}
            />
          </div>
          <div className="temperatureForecast">
            {data.tempMax}° <span className="minTemp">{data.tempMin}°</span>
          </div>
        </div>
      ))}
      </div>
      <div className="footer">
      This project was coded by
        <a href="https://github.com/niki0410" target="_blank" rel="noreferrer">Nikolett Hartmann</a> and is
        <a href="https://github.com/niki0410/react-weather" target="_blank" rel="noreferrer"> on GitHub</a> and
        <a href="https://app-react-weather-app.netlify.app/" target="_blank" rel="noreferrer">hosted on Netlify</a>
      </div>
    </div>
    </div>
  );
}

export default Search;
