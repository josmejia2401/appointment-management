import { axiosInstance } from './fetch.js'
import api from './api.constants';
import { buildAndThrowNewError, buildHeaders, setAccessToken } from './api.common';

export const signIn = async (payload) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.post(`${api.security.signIn}`, payload, {
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
