import axios from 'axios';
import React,{useEffect, useState} from 'react';
import "./style.css";

const Weather = () => {

    const [latitude, setLatitud] = useState(0)
    const [longitude, setLongitud] = useState(0)
    const [weather, setWeather] = useState("")
    const [temperature, setTemperature] = useState(0)
    const [cityName, setCityName] = useState("")
    const [country, setCountry] = useState("")
    const [icon, setIcon] = useState("")
    const [speed, setSpeed] = useState("")
    const [clouds, setClouds] = useState("")
    const [changeTemp, setChangeTemp] = useState("metric")

    const [pressure, setPressure] = useState("")

    const savePositionToState = (position) => {
        setLatitud(position.coords.latitude)
        setLongitud(position.coords.longitude)
    };

    
   
    const WeatherData = async () =>{
            window.navigator.geolocation.getCurrentPosition(savePositionToState)
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=73e4aae7fa9d0e5b46253c138b05dede&units=${changeTemp}`)
            setCityName(res.data.name)
            setWeather(res.data.weather[0].description)
            setCountry(res.data.sys.country)
            setTemperature(res.data.main.temp)
            setSpeed(res.data.wind.speed)
            setClouds(res.data.clouds.all)
            setPressure(res.data.main.pressure)
            setIcon("http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png")
            console.log(res.data)  
    }    

    useEffect(() => {
        WeatherData();
    }, [latitude, longitude, changeTemp])

    
    return(
        <div className="body">
            <div className="container">
                <div className="title">
                  <h1>{country}</h1>
                  <h2>Weather in {cityName}</h2>
                </div>
                <div className="body__container--all">
                    <div className = "img">
                        <img  src = {icon} />
                        <h2>{temperature}°C</h2>
                    </div>
                    <div className="information">
                        
                        <p>"{weather}"</p>
                        <p>Clouds: {clouds}%</p>
                        <p>Wind Speed: {speed}</p>
                        <p>Pressure {pressure} mb</p>
                        
                    </div>
                </div>
                <button onClick = {() => {setChangeTemp("imperial");}} >DEGREES °F/°C</button>
            </div>
        </div>
    )
   
}
 
export default Weather;

