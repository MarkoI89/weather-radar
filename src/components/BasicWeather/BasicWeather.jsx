/* eslint-disable no-template-curly-in-string */
import axios from "axios";
import { useEffect, useState } from "react";
import basicWeather from "./BasicWeather.css";
import DailyWeather from "../DailyWeather/DailyWeather";
import HourlyWeather from "../HourlyWeather/HourlyWeather";
// import GeoLocation from "../GeoLocation";
// import { useGeolocated } from "react-geolocated";
import sunnyWeather from "../../img/suny.jpg";
import rainyWeather from "../../img/rainy.jpg";
import sunrise from "../../img/sunrise-21-512.png";
import sunset from "../../img/sunset-16-512 (1).png";

export default function BasicWeather() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState(""); //location is used inside api to specify the city to fetch the weather data
  const [inputValue, setInputValue] = useState(""); //is value typed inside search bar
  const [astroData, setAstroData] = useState([]);
  // const [ latitude, setLatitude ] = useState("")
  // const [ longitude, setLongitude ] = useState("")
  // const [ dataCloud, setDataCloud ] = useState([])

  // const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  //       useGeolocated({
  //           positionOptions: {
  //               enableHighAccuracy: false,
  //           },
  //           watchPosition: true,
  //           userDecisionTimeout: null,
  //       });

  //     useEffect(() => {
  //         if(coords){
  //           setLatitude(coords.latitude)
  //           setLongitude(coords.longitude)
  //       }
  //         axios
  //           .get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude${longitude}&localityLanguage=en`)
  //           .then((response) => {
  //               setDataCloud(response.data)
  //           })
  //           .then(() => {
  //               setLocation(dataCloud.city)
  //           })
  //           .catch((err) => console.error(err))
  //   },[coords, latitude, longitude, dataCloud.city, ])

  const getAstroData = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/astronomy.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&dt=2023-08-19`
      )
      .then((response) => {
        setAstroData(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&aqi=yes`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((err) => console.error(err));
    getAstroData();
  }, [location]);

  const handleSearch = () => {
    setLocation(inputValue); //location gets the value from the search bar and fetch data to show weather for that specific city
  };

  const sunny = {
    color: "white",
    backgroundImage: `url(${sunnyWeather})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const partyCloudy = {
    backgroundColor: "blue",
  };

  const other = {
    backgroundColor: "green",
  };

  const weatherStyle = () => {
    if (weatherData.current) {
      if (
        weatherData.current.condition.text === "Sunny" ||
        weatherData.current.condition.text === "Clear"
      ) {
        return sunny;
      } else if (weatherData.current.condition.text === "Partly cloudy") {
        return partyCloudy;
      } else {
        return other;
      }
    }
  };

  return (
    <>
      <div style={weatherStyle()}>
        <div className="search">
          <input
            className="search-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {!location && (
          <div>
            <h4>Type your location</h4>
          </div>
        )}
        {
          <div className="currentWeatherContainer">
            {location && (
              <div className="mainTempDetails">
                {weatherData.location ? (
                  <h3>{weatherData.location.name}</h3>
                ) : null}
                {weatherData.location ? (
                  <h3>{weatherData.location.country}</h3>
                ) : null}
                {weatherData.current ? (
                  <h2>{Math.round(weatherData.current.temp_c)}°C</h2>
                ) : null}
                {weatherData.current ? (
                  <img src={weatherData.current.condition.icon} alt="" />
                ) : null}
                {weatherData.current ? (
                  <p>{weatherData.current.condition.text}</p>
                ) : null}
              </div>
            )}
            {location && (
              <div className="additionalDetails">
                <div className="additionalDetailsFlex2">
                  {weatherData.current ? (
                    <p>
                      feels like: {Math.round(weatherData.current.feelslike_c)}{" "}
                      °C
                    </p>
                  ) : null}
                  {weatherData.current ? (
                    <p>pressure: {weatherData.current.pressure_mb} mbar</p>
                  ) : null}
                  {weatherData.current ? (
                    <p>humidity: {weatherData.current.humidity}%</p>
                  ) : null}
                  {weatherData.current ? (
                    <p>UV: {weatherData.current.uv}</p>
                  ) : null}
                </div>
                <div className="additionalDetailsFlex2">
                  {weatherData.current ? (
                    <p>visibility: {weatherData.current.vis_km} km</p>
                  ) : null}
                  {weatherData.current ? (
                    <p>wind speed: {weatherData.current.wind_kph} km/h</p>
                  ) : null}
                  {weatherData.current ? (
                    <p>wind degree: {weatherData.current.wind_degree} °</p>
                  ) : null}
                  {weatherData.current ? (
                    <p>wind degree: {weatherData.current.wind_dir}</p>
                  ) : null}
                </div>
                <div className="additionalDetailsFlex3">
                  <div className="astroDetails" >
                    <img src={sunrise} alt="sunrise" />
                    {astroData.astronomy
                      ? <p>{astroData.astronomy.astro.sunrise}</p>
                      : null}
                  </div>
                  <div className="astroDetails" >
                    <img src={sunset} alt="sunrise" />
                    {astroData.astronomy
                      ? <p>{astroData.astronomy.astro.sunset}</p>
                      : null}
                  </div>
                </div>
              </div>
            )}
          </div>
        }
        <div></div>
        {location && <HourlyWeather location={location} />}
        {location && <h3 style={{ fontWeight: "100" }}> 2 days forecast </h3>}
        {location && <DailyWeather location={location} />}
      </div>
    </>
  );
}
