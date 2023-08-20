import dailyWeatherModal from "./DailyWeatherModal.css"

export default function DailyWeatherModal({maxTemp, minTemp, condition, icon, date, setClickedDay, visibility, rainProbability, snowProbability, humidity, windSpeed, uvIndex }){

    const handleClick = () => {
        setClickedDay(null)
    }

    return(
        <div className="dailyModal" >
            <button onClick={handleClick}>X</button>
            <div>
                <p>{date}</p>
                <img src={icon} alt="weather icon" />
                <h3>{condition}</h3>
                <p>max temp {Math.round(maxTemp)}°C</p>
                <p>min temp {Math.round(minTemp)}°C</p>   
            </div>
            <div className="dailyModalAdditional" >
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
    )
}