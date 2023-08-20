import axios from "axios";
import { useEffect, useState } from "react";
import hourlyWeather from "./HourlyWeather.css"
import ScrollContainer from 'react-indiana-drag-scroll'

export default function HourlyWeather({location}){
    const [ hourlyData, setHourlyData ] = useState([])

    useEffect(() => {
        axios
          .get(
            `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=6&aqi=no&alerts=no`
          )
          .then((response) => {
            setHourlyData(response.data)
          })
          .catch((err) => console.error(err));
    
    },[location]);

    return(
        <div className="hourlyDataBox" >
        <h3>Hourly Forecast</h3>
        <ScrollContainer className="hourlyData">
          {hourlyData.forecast ? hourlyData.forecast.forecastday[0].hour.map( (e) => (
            <div className="hourlyDetails">
              {e.time.slice(11)}
              <p>{Math.round(e.temp_c)}°</p>
              <img src={e.condition.icon} alt="icon" />
              <p>rain probability <br />{e.chance_of_rain}%</p>
            </div>
          ) ) : null}
          </ScrollContainer>
        </div>
    )
}
