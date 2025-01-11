import search_icon from '../assets/Search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import clear_icon from '../assets/clear.png'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import Additional from './Additional'




const Weather = () => {


    
    const [name, setname] = useState('')
    const [weatherName, setweatherName] = useState('')
    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState('');
    const allIcons ={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": drizzle_icon,
        "11n": drizzle_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": drizzle_icon,
        "50n": drizzle_icon,
    }
    
    const search = async (city) => {

        if(city.trim() === ''){
            setError("CITY NAME CANNOT BE EMPTY!!!")
            return;
        }


      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response = await axios.get(url);
        console.log(response.data);
        setError('')
        
        const icon = allIcons[response.data.weather[0].icon] || clear_icon;
        
        const weatherType = response.data.weather[0].main
        if (weatherType === "Clear") {
            // console.log("It's sunny!");
            setweatherName("It's sunny")
          } else if (weatherType === "Clouds") {
            // console.log("It's cloudy!");
            setweatherName("It's cloudy")
          } else if (weatherType === "Rain" || weatherType === "Drizzle") {
            // console.log("It's rainy!");
            setweatherName("It's rainy")
          } else if (weatherType === "Snow") {
            // console.log("It's snowy!");
            setweatherName("It's snowy")
          } else {
            setweatherName("It's sunny")
            // console.log("Weather condition: ", weatherType);
          }
        //   console.log(weatherName);
        


        setWeatherData({
            humidity: response.data.main.humidity,
            windspeed: response.data.wind.speed,
            temperature: Math.floor(response.data.main.temp),
            pressure: response.data.main.pressure,
            location: response.data.name,
            icon: icon,
            
            visibility: response.data.visibility,
            name: weatherName,
        }); 
       
       
       
       
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
        setError('INVALID CITY NAME !!!')
        // console.log(error,err);
        console.error(error,err)
      }
    };
  
    // useEffect(() => {
    //   search(name);
    // },[]);
    


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white">
    <h1 className="text-2xl font-bold mb-3 md:text-4xl md:mb-6 ">Weather App</h1>
    
    {/* Search Bar */}

    <div className="  w-full max-w-xs md:max-w-md flex justify-between items-center   bg-white rounded-xl px-3">

      <input
        value={name}
        onChange={(e)=>{
            setname(e.target.value)
            
        }}
        onKeyDown={(k)=>{
           
            if(k.key == "Enter"){
                search(name)
            }
             
        }}
        type="text"
        placeholder="Search city..."
        className="w-full p-3 rounded-lg outline-none text-gray-700 focus:outline-none  "
      />
      <img 
      onClick={()=>{
        search(name)
      }}
      className='w-fit h-fit px-2' 
      src={search_icon} 
      alt="search icon" />
      
    </div>

    {error && <span className='text-red-500 font-semibold text-xs md:text-sm mt-2'>{error}</span> }

     
    {/* Weather Card */}
    <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg py-2 md:p-6 text-center mt-4 md:mt-8 shadow-lg w-full max-w-xs md:max-w-sm">
      <h2 className="text-xl md:text-2xl font-semibold">{weatherData.location || 'City Name'}</h2>
      <div className="flex items-center justify-center mt-2  md:mt-4 ">
        <span className="text-5xl md:text-6xl font-bold">{weatherData.temperature || 0}°C</span>
        <img
          src={weatherData.icon? `${weatherData.icon}`:`${clear_icon}`   }
          alt="weather icon"
          className="w-20 h-20 ml-4"
        />
      </div>
      <p className="mt-4 text-lg">{weatherData.name || "It's sunny"}</p>
    </div>

    
    {/* Additional Info */}
    <div className="mt-8 grid grid-cols-2 gap-5 md:max-w-md w-full max-w-xs">

        <Additional img={humidity_icon} data={`${weatherData.humidity || 0}%`} name={"Humidity"} />
        <Additional img={wind_icon} data={`${Math.floor((weatherData.windspeed) * 3.6) || 0} km/h`} name={"Wind Speed"} />
        <Additional img={humidity_icon} data={`${weatherData.pressure || 0} hPa`} name={"Pressure"} />
        <Additional img={drizzle_icon} data={`${((weatherData.visibility)/1000) || 0} km`} name={"Visibility"} />
     
    </div>
  </div>
  )
}

export default Weather