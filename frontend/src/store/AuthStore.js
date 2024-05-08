import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";

class AuthStore {
    isLoggedIn = false;
    userData = null;

    constructor() {
        makeAutoObservable(this);
    }

    setLoggedIn(status) {
        this.isLoggedIn = status;
    }

    async login(username, password) {
        try {
            const data = await AuthService.login(username, password);
            this.userData = data.user;
            this.setLoggedIn(true);
            return data
        } catch (error) {
            console.error('Login failed:', error);
            this.setLoggedIn(false);
            this.userData = null;
        }
    }

    async register(username, password){
        try {
            const data = await AuthService.register(username, password);
            this.userData = data.user;
            this.setLoggedIn(true);
        } catch (error) {
            console.error('Register failed:', error);
            this.setLoggedIn(false);
            this.userData = null;
        }
    }

    logout() {
        AuthService.logout();
        this.setLoggedIn(false);
        this.userData = null;
    }

    async getUserData() {
        try {
            const data = await AuthService.checkSession();
            this.userData = data.user;
            this.setLoggedIn(true);
        } catch (error) {
            console.error('Get user data failed:', error);
            this.setLoggedIn(false);
            this.userData = null;
        }
    }
}

const authStore = new AuthStore();
export default authStore;
