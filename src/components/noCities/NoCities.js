import React from "react";
import sun from '../../images/sun.png';
import styles from './noCities.module.css';

export default function NoCities() {
    return (
        <div id={styles.container}>
            <img id={styles.sun_img} src={sun} alt='sun' />
            <h3>Cities list is empty...</h3>
        </div>
    )
}