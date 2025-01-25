import axios, { AxiosResponse } from 'axios';
import { LoginResponse  } from '../models/AuthResponse'
const API_URL = 'http://localhost:5000/api/auth';

export const register = async (username: string, password: string) => {
    return await axios.post(API_URL +'/register', { username, password });
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response: AxiosResponse<LoginResponse> = await axios.post(API_URL + '/login', { username, password });
    return response.data;
};

export const logout = async () => {
    return await axios.post(API_URL + '/ logout');
};

export const forgotPassword =  async (username: string, password: string) => {
    return await axios.post(API_URL +'/forgotpassword', { username, password });
};
