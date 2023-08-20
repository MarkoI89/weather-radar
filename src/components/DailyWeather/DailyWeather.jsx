import axios from "axios";
import { useEffect, useState } from "react";
import dailyWeather from "./DailyWeather.css";
import DailyWeatherModal from "../dailyWeatherModal/DailyWeatherModal";

export default function DailyWeather({ location }) {
  const [dailyData, setDailyData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [clickedDay, setClickedDay] = useState(null);
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [icon, setIcon] = useState(null);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [rainProbability, setRainProbability] = useState("");
  const [snowProbability, setSnowProbability] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [uvIndex, setUvIndex] = useState("");

  const handleClick = (e, index) => {
    //on click open modal which shows more details for that spacific date
    setClickedDay(true);
    setCurrentIndex(e.index);
    setMaxTemp(e.day.maxtemp_c);
    setMinTemp(e.day.mintemp_c);
    setIcon(e.day.condition.icon);
    setCondition(e.day.condition.text);
    setDate(e.date);
    setVisibility(e.day.avgvis_km);
    setRainProbability(e.day.daily_chance_of_rain);
    setSnowProbability(e.day.daily_chance_of_snow);
    setHumidity(e.day.avghumidity);
    setWindSpeed(e.day.maxwind_kph);
    setUvIndex(e.day.uv);
  };

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/forecast.json?key=b24b976a466042f9a95184845232502&q=${location}&days=8&aqi=no&alerts=no`
      )
      .then((response) => {
        setDailyData(response.data);
      })
      .catch((err) => console.error(err));
  }, [location]);

  return (
    <>
      <div className="dailyData">
        {dailyData.forecast
          ? dailyData.forecast.forecastday
              .map((e, index) => (
                <div
                  className="dailyDataContainer"
                  onClick={() => handleClick(e, index)}
                >
                  <p>{e.date}</p>
                  <img src={e.day.condition.icon} alt="" />
                  <p>{e.day.condition.text}</p>
                  <p>max: {Math.round(e.day.maxtemp_c)}°C</p>
                  <p>max: {Math.round(e.day.mintemp_c)}°C</p>
                  <div></div>
                  <div className="dailyModalAdditional">
                    <div>
                      <p>visibility {visibility} km</p>
                      <p>rain probability {rainProbability} %</p>
                      <p>snow probability {snowProbability} %</p>
                    </div>
                    <div>
                      <p>avg humidity {humidity} %</p>
                      <p>max wind speed {windSpeed} km/h</p>
                      <p>UV index {uvIndex}</p>
                    </div>
                  </div>
                </div>
              ))
              .splice(1)
          : null}
        {clickedDay && (
          <DailyWeatherModal
            maxTemp={maxTemp}
            minTemp={minTemp}
            condition={condition}
            icon={icon}
            date={date}
            setClickedDay={setClickedDay}
            visibility={visibility}
            rainProbability={rainProbability}
            snowProbability={snowProbability}
            humidity={humidity}
            windSpeed={windSpeed}
            uvIndex={uvIndex}
          />
        )}
      </div>
    </>
  );
}
