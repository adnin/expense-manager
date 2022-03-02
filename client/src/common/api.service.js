import JwtService from './jwt.service';
import axios from 'axios';
import { API_URL } from './config';

export const axiosClient = axios.create({
    baseURL: API_URL
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = JwtService.getToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(undefined, function (error) {
    if (error) {
        const httpError = JSON.parse(JSON.stringify(error));
        if (httpError.status === 401) {
            window.location.replace('/login');
        }
        return Promise.reject(error);
    }
});

const ApiService = {
    query(resource, params) {
        return axiosClient.get(resource, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(resource, slug = '') {
        return axiosClient.get(`${resource}/${slug}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return axiosClient.post(`${resource}`, params);
    },

    update(resource, params) {
        return axiosClient.put(`${resource}`, params);
    },

    put(resource, params) {
        return axiosClient.put(`${resource}`, params);
    },

    delete(resource) {
        return axiosClient.delete(resource).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default ApiService;

export const RolesService = {
    get() {
        return ApiService.get('roles');
    },

    post(payload) {
        return ApiService.post(`roles`, payload);
    },

    update(payload) {
        return ApiService.update(`roles/${payload.id}`, payload);
    },

    destroy(id) {
        return ApiService.delete(`roles/${id}`);
    }
};
