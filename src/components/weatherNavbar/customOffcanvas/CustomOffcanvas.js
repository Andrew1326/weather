import React from "react";
import { Form, Offcanvas } from "react-bootstrap";
import styles from './customOffcanvas.module.css';

export default function CustomOffcanvas({show, setShow, temp, setTemp}) {

    const tempValues = ['C', 'F', 'K']

    // offcanvas close
    const handleClose = () => setShow(false);

    // radio change
    const handleChange = e => {
        const value = e.target.value;
        setTemp(value);
    };

    return (
        <Offcanvas id={styles.offcanvas} show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton closeVariant="white"><h4>App settings:</h4></Offcanvas.Header>
            <Offcanvas.Body>
                <h4>Temp in <sup>o</sup>{temp}</h4>
                <div id={styles.radios_container}>
                {
                    tempValues.map((el, i) => <Form.Check 
                    key={i}
                    inline
                    type="radio"
                    label={el}
                    value={el}
                    onChange={handleChange}
                    checked={el === temp}
                    />)
                }
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}