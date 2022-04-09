import React, { useState } from "react";
import styles from './weatherNavbar.module.css';
import { Button, Navbar } from 'react-bootstrap';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';
import CustomOffcanvas from "./customOffcanvas/CustomOffcanvas";
import sun from '../../images/sun.png';

export default function WeatherNavbar({temp, setTemp}) {

    const [show, setShow] = useState(false)

    // show
    const handleOffcanvasShow = () => setShow(true);

    // props
    const customOffcanvasProps = {show, setShow, temp,  setTemp};

    return (
        <Navbar id={styles.navbar} variant='dark'>
            <div id={styles.content_container}>
            <Button variant="info" onClick={handleOffcanvasShow}><MenuIcon /></Button>
            <Navbar.Brand id={styles.brand}><i>Current</i><img src={sun} alt='sun' /></Navbar.Brand>
            <CustomOffcanvas {...customOffcanvasProps} />
            </div>
        </Navbar>
    )
}