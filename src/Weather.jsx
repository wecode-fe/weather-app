import { useEffect, useState } from 'react';
import CityWeather from './CityWeather'
const API_KEY = ''; // put in your weather api key
let localCache = {};

const Weather = props => {
    const [location, setLocation] = useState('Arbil');
    const [weather, setWeather] = useState({
        city: location,
        country: 'Iraq',
        localtime: '2021-12-21 15:14',
        icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
        temp: 10
    });

    const updateWeather = async () => {
        if (localCache[location]) {
            setWeather(localCache[location])
            return
        }
        const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
        const data = await res.json();
        const newWeather = {
            city: data.location.name,
            country: data.location.country,
            localtime: data.location.localtime,
            icon: data.current.condition.icon,
            temp: data.current.temp_c
        }
        localCache[location] = newWeather;
        setWeather(newWeather)
    }

    useEffect(() => {
        updateWeather()
    }, [location])

    return (
        <div className="weather-container">
            <div className='search-area'>
                <label htmlFor="location">
                    Location
                    <select id="location"
                        value={location}
                        onChange={e => {
                            setLocation(e.target.value)
                        }}>
                        <option value="Arbil">Erbil</option>
                        <option value="Kirkuk">Kirkuk</option>
                        <option value="London">London</option>
                        <option value="Koya Iraq">Koya</option>
                    </select>
                </label>
            </div>
            <CityWeather
                city={weather.city}
                country={weather.country}
                localtime={weather.localtime}
                icon={weather.icon}
                temp={weather.temp}
            />
        </div>
    )
}

export default Weather;