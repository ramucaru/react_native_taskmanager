import apiClient from './apiClient';
import { useStateContext } from '@/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        if (response.data) {
            console.log(response.data, "dataaaaaaaaaa");
            await AsyncStorage.setItem("token", response.data.token);
            return response.data;
        }
    } catch (error) {
        console.log(error.message);

        throw new Error(error.message || "Internal Error");
    }
};

export const createAccount = async (payload: Object) => {
    try {
        const response = await apiClient.post('/auth/register', payload);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        throw new Error(error.message || "Internal Error")
    }
}

export const logout = async () => {
    try {
        await AsyncStorage.removeItem("token");
    } catch (error) {
        throw new Error(error.message || "Internal Error");
    }
};

export const ForgetPassword = async (email: string, password: string) => {
    try {
        const response = await apiClient.patch('/auth/forget_password', { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.message || "Internal Error")
    }
}
