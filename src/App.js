import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Weather from './Weather';

function App() {
  const [weather,setWeather] = useState([])
  const APIKEY = 'a9b3e254d156fbd5013563887a1b4395'


  const fetchLocationWeatherData = async(e) => {
    const cityName = e.target.elements.city.value
    const countryName = e.target.elements.country.value
    e.preventDefault()
      if(cityName && countryName){
        const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&APPID=${APIKEY}`)
        .then( res => res.json())
        .then(data => data)
        setWeather(
          {
            data: apiData,
            city: apiData.city,
            country: apiData.sys.country,
            description: apiData.weather[0].description,
            temperature: Math.round(apiData.main.temp * 9/5 - 459.67),
            error:""
          }
        
        )
      }else{
        setWeather(
          {
            data: '',
            city: '',
            country: '',
            description: '',
            temperature: '',
            error:"Please Type A City And Country"
          }
        
        )
      }
      
  }

  
  return (
    <div className="App">
     <h3>Weather App</h3>
     <Form getWeather={fetchLocationWeatherData} />
      <Weather
      city={weather.city}
      country={weather.country}
      description={weather.description}
      temperature={weather.temperature}
      error={weather.error}
      />
    </div>
  );
}

export default App;
