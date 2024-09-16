import { axiosInstance } from './fetch.js'
import api from './api.constants';
import { buildAndThrowNewError, buildHeaders } from './api.common';


export const create = async (payload) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.post(`${api.users.create}`, payload, {
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
        const res = await axiosInstance.get(`${api.users.find.replace(":id", id)}`, {
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
        const urlParameters = Object.entries(payload).map(e => e.join('=')).join('&');
        const authHeaders = buildHeaders();
        const res = await axiosInstance.get(`${api.users.filter}?${urlParameters}`, {
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
        const res = await axiosInstance.put(`${api.users.update.replace(":id", id)}`, payload, {
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
        const res = await axiosInstance.put(`${api.users.delete.replace(":id", id)}`, {
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


export const associateEmployee = async (id, payload) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.put(`${api.users.associate_employee.replace(":id", id)}`, payload, {
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


export const findEmployees = async (id,) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.get(`${api.users.find_employees.replace(":id", id)}`, {
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

export const findInvitations = async (id,) => {
    try {
        const authHeaders = buildHeaders();
        const res = await axiosInstance.get(`${api.users.find_invitations.replace(":id", id)}`, {
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
