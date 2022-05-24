import axios from "axios";

const root_url = 'http://192.168.29.131:5004/api/v1';

export const registerApi = async (params) => await axios.post(`${root_url}/register`, params);

export const sendOtpApi = async (phoneNumber) => await axios.post(`${root_url}/sendOtp`, {
    phone: phoneNumber
});

export const verifyOtpApi = async (params) => await axios.post(`${root_url}/verifyOtp`, params);

export const logoutApi = async (params) => await axios.post(`${root_url}/logout`, params);

export const refreshApi = async (params) => await axios.post(`${root_url}/refresh`, params);

export const publishImageApi = async (params) => await axios.post(`${root_url}/publishImage`, params);

export const profileApi = async (params) => await axios.post(`${root_url}/profile`, params);

export const mediaApi = async (params) => await axios.get(`${root_url}/allmedia`, params);

export const singleMediaApi = async (params) => await axios.get(`${root_url}/singlemedia/:id`, params);

export const albumMediaApi = async (params) => await axios.get(`${root_url}/albummedia/:id`, params);

export const shortAccessTokenApi = async (params) => await axios.post(`${root_url}/shortAccessToken`, params);

export const longLivedAccessTokenApi = async (params) => await axios.get(`${root_url}/longLivedAccessToken`, params);

export const detailsApi = async () => await axios.get(`${root_url}/getDetails`);