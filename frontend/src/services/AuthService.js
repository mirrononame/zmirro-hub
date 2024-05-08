// services/AuthService.js
import axios from 'axios';
import { _allowStateChangesInsideComputed } from 'mobx';

const API_URL = 'http://localhost:3001/users';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});


function setCookie(name, value, days) {
    let expires = "";
    if(days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (value || "")  + expires + "; path=/; secure";
    }
}


class AuthService {
    static async login(username, password) {
        try {
            const response = await axiosInstance.post(`/login`, { username, password });
            setCookie('token', response.data.token, 1);
            return response.data;  // предполагаем, что бэкенд возвращает данные пользователя и токен
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    static async register(username, password) {
        try {
            const response = await axiosInstance.post(`/register`, {username, password});
            setCookie('token', response.data.token, 1);
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    static async logout() {
        try {
            const response = await axiosInstance.post(`/logout`);
            setCookie('token', response.data.token, 1);
            console.log(response);
            return true;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    }
    static async checkSession() {
        try {
            const response = await axiosInstance.get(`/checksession`);
            return response.data;
        } catch (error) {
            console.error('Session check error:', error);
            return null
        }
    }
}

export default AuthService;