import axios from 'axios';

import api from './api.constants';
import { buildAndThrowNewError, buildHeaders, setAccessToken } from './api.common';

export const signIn = async (payload) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axios.post(`${api.security.signIn}`, payload, {
            headers: {
                ...authHeaders
            },
        });
        const data = res.data;
        setAccessToken(data["accessToken"]);
        return data;
    } catch (error) {
        console.error(error);
        buildAndThrowNewError(error);
    }
}

export const register = async (payload) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axios.post(`${api.security.register}`, payload, {
            headers: {
                ...authHeaders
            },
        });
        const data = res.data;
        return data;
    } catch (error) {
        console.error(error);
        buildAndThrowNewError(error);
    }
}