import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { detailsApi } from '../../Api/index';

const useHome = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        callApi();
    }, []);

    const callApi = async () => {
        try {
            const resp = await detailsApi();
            console.log('response from the API', resp);
            setData(resp);
        } catch (error) {
            console.log(error.message);
            console.warn(error.message);
        }
    };

    return {
        data,
        setData,
    };
};

export default useHome;