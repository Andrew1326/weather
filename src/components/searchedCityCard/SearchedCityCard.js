import React from "react";
import { Button, Card } from 'react-bootstrap';
import styles from './searchedCityCard.module.css';

export default function SearchedCityCard({city, cities, setCities, temp}) {

    // temp calcs
    const kelvinToCelsius = k => Math.round(parseFloat(k)-273.15);
    const kelvinToFahrenheit = k => Math.round((parseFloat(k) - 273.15) * 9/5 + 32);

    // create temp
    const createTemp = () => {
        let res;

        switch(temp) {
            case 'C':
                res = <span>{kelvinToCelsius(city.main.temp)} <sup>o</sup>C</span>;
                break;
            case 'F':
                res = <span>{kelvinToFahrenheit(city.main.temp)} <sup>o</sup>F</span>;
                break;
            case 'K':
                res = <span>{city.main.temp}K</span>;
                break;
            default:
                res = <span>{city.main.temp}K</span>; 
        };

        return res
    };

    // save city
    const saveCity = () => {
        const copy = [...cities];
        copy.push(city);

        setCities(copy);
    };

    return (
        <>
        <div id={styles.container}>
            {
                !cities.map(el => el.name).includes(city.name) && <Card id={styles.card}>
            <Card.Header id={styles.card_header}>
                <Card.Title>{city.name} "{city.sys.country}"</Card.Title>
            </Card.Header>
            <Card.Body>
                <div id={styles.temp}>
                    <img src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt="" />&nbsp;&nbsp;<h1>{createTemp()}</h1>
                </div>
                <div id={styles.description_container}>
                    <h4>{city.weather[0].description}</h4>
                </div>
            </Card.Body>
            <Card.Footer id={styles.card_footer}>
                <Button variant='warning' onClick={() => saveCity()}>save city</Button>
            </Card.Footer>
        </Card>
            }
        </div>
        </>
    )
}