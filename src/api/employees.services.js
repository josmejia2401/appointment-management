import { axiosInstance } from './fetch.js'
import api from './api.constants';
import { buildAndThrowNewError, buildHeaders } from './api.common';


export const create = async (payload) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.post(`${api.employees.create}`, payload, {
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

export const find = async (id) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.get(`${api.employees.find.replace(":id", id)}`, {
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

export const filter = async (payload) => {
    try {

        const urlParameters = payload && Object.keys(payload).length !== 0 ? `?${Object.entries(payload).map(e => e.join('=')).join('&')}` : '';
        const authHeaders = buildHeaders();
        const res = await axiosInstance.get(`${api.employees.filter}${urlParameters}`, {
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


export const update = async (id, payload) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.put(`${api.employees.update.replace(":id", id)}`, payload, {
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


export const del = async (id) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.delete(`${api.employees.delete.replace(":id", id)}`, {
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
