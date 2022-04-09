import { useState, useEffect } from "react";
import axios from 'axios';

const useFetch = url => {

    const [data, setData] = useState()
    const [err, setErr] = useState()

    // fetch data
    useEffect(() => {
        const data = async () => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                setData(data);
                
            } catch(err) {
                setErr(err.message);
            };
        };

        url && data();
    }, [url])

    return { data, err }
}

export default useFetch