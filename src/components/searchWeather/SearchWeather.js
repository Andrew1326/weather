import React, { useState } from "react";
import styles from './searchWeather.module.css';
import { WEATHER_URL } from "../../constants";
import { Form, Button } from 'react-bootstrap';

export default function SearchWeather({setUrl, createUrl}) {

    const [city, setCity] = useState('')

    const submit = e => {
        e.preventDefault();

        const params = {
            q: city,
            appid: process.env.REACT_APP_API_KEY
        };

        const url = createUrl(WEATHER_URL, params);
        setUrl(url);

        setCity('');
    };

    return (
        <div id={styles.container}>
        <Form onSubmit={submit}>
            <div id={styles.form_content_container}>
                <Form.Control
                value={city}
                onChange={e => setCity(e.target.value)}
                id={styles.form_input}
                placeholder='Enter city name...'
                />
                <Button variant="warning" type='submit'>search</Button>
            </div>
        </Form>
        </div>
    );
}