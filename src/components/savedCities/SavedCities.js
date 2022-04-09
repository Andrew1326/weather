import React from "react";
import WeatherCard from "../weatherCard/WeatherCard";
import styles from './savedCities.module.css';

export default function SavedCities({cities, setCities, temp}) {

    const weatherCardProps = {cities, setCities, temp}

    return (
        <>
        <div id={styles.container}>
            <div id={styles.saved_cities_container}>
            {
                cities.map((el, i) => <WeatherCard city={el} key={i} {...weatherCardProps} />)
            }
            </div>
        </div>
        </>
    )
}