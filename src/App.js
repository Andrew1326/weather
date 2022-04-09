import React, { useState } from "react";
import SavedCities from "./components/savedCities/SavedCities";
import SearchWeather from './components/searchWeather/SearchWeather';
import WeatherNavbar from "./components/weatherNavbar/WeatherNavbar";
import useFetch from "./hooks/useFetch";
import SearchedCityCard from './components/searchedCityCard/SearchedCityCard';
import useFetchAll from "./hooks/useFetchAll";
import CustomAlert from './components/customAlert/customAlert';
import { CITIES_REQUEST_FAILED, CITY_REQUEST_FAILED, OFFLINE_HEADER, OFFLINE_TEXT, WEATHER_URL } from './constants';
import NoCities from './components/noCities/NoCities';
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {

  const { data: cities, setData: setCities, err: fetchCitiesErr } = useFetchAll(JSON.parse(localStorage.getItem('cities')) ? JSON.parse(localStorage.getItem('cities')).map(el => createUrl(WEATHER_URL, {
    q: el.name,
    appid: process.env.REACT_APP_API_KEY
  })) : [])

  const [temp, setTemp] = useLocalStorage('temp', 'K')
  const [url, setUrl] = useState()
  const { data: city, err: fetchCityErr } = useFetch(url)

  // create url
  function createUrl(url, params) {
    const fetchUrl = new URL(url);
    fetchUrl.search = new URLSearchParams(params).toString();
    return fetchUrl
  };

  // props
  const weatherNavbarProps = {temp, setTemp};
  const searchWeatherProps = {setUrl, createUrl};
  const offLineAlertProps = {heading: OFFLINE_HEADER, text: OFFLINE_TEXT, variant: 'warning'};
  const fetchCityErrAlertProps = {heading: fetchCityErr, text: CITY_REQUEST_FAILED, variant: 'warning'};
  const fetchCitiesErrAlertProps = {heading: fetchCitiesErr, text: CITIES_REQUEST_FAILED, variant: 'warning'};
  const searchedCityCardProps = {city, cities, setCities, temp};
  const savedCitiesProps = {cities, setCities, temp};

  return (
    <>
    <WeatherNavbar {...weatherNavbarProps} />
    <SearchWeather {...searchWeatherProps} />
    {
      !navigator.onLine && <CustomAlert {...offLineAlertProps} />
    }
    {
      fetchCityErr && <CustomAlert {...fetchCityErrAlertProps} />
    }
    {
      fetchCitiesErr && <CustomAlert {...fetchCitiesErrAlertProps} />
    }
    {
      city && <SearchedCityCard {...searchedCityCardProps} />
    }
    {
      cities.length > 0 ? <SavedCities {...savedCitiesProps} /> : <NoCities />
    }
    </>
  );
}