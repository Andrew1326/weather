import axios from "axios";
import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useFetchAll = urls => {

    const [data, setData] = useLocalStorage('cities', [])
    const [err, setErr] = useState()

    // getting data
    useEffect(() => {

        const fetchData = async () => {
            try {
                const promises = urls.map(el => axios.get(el));
                const data = await axios.all(promises).then(data => data.map(el => el.data));

                setData(data);
            } catch (err) {
                setErr(err.message);
            };
        };

        urls.length > 0 && fetchData();

    }, [])

    return { data, setData, err }
}

export default useFetchAll