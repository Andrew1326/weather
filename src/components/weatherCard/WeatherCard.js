import React from "react";
import styles from './weatherCard.module.css';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function WeatherCard({city, cities, setCities, temp}) {

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

    // delete city
    const deleteCity = () => {
        const copy = [...cities];
        const filtered = copy.filter(el => el !== city);

        setCities(filtered);
    };

    return (
        <>
        <Card id={styles.card}>
            <Card.Header>
                <Card.Title>{city.name} "{city.sys.country}"</Card.Title>
            </Card.Header>
            <Card.Body>
                <div id={styles.temp}>
                    <img src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt="icon" />&nbsp;&nbsp;<h1>{createTemp()}</h1>
                </div>
                <div id={styles.description_container}>
                    <h4>{city.weather[0].description}</h4>
                </div>
                <ListGroup>
                    <ListGroup.Item className={styles.description_item}>feels like: {createTemp()}</ListGroup.Item>
                    <ListGroup.Item className={styles.description_item}>visibility: {city.visibility / 1000}km</ListGroup.Item>
                    <ListGroupItem className={styles.description_item}>clouds: {city.clouds.all}</ListGroupItem>
                    <ListGroup.Item className={styles.description_item}>wind: {city.wind.speed}mi/hr</ListGroup.Item>
                    <ListGroup.Item className={styles.description_item}>humidity: {city.main.humidity}%</ListGroup.Item>
                    <ListGroup.Item className={styles.description_item}>sunrise: {new Date(city.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</ListGroup.Item>
                    <ListGroup.Item className={styles.description_item}>sunset: {new Date(city.sys.sunset * 1000).toLocaleTimeString('en-IN')}</ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <Card.Footer id={styles.card_footer}>
                <Button variant="danger" onClick={() => deleteCity()}>delete city</Button>
            </Card.Footer>
        </Card>
        </>
    );
}