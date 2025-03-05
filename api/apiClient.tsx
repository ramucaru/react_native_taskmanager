import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://nodejs-restapi-task.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
    timeoutErrorMessage: "Time expired"
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        throw new Error(error.response.data.error);
    }
)


export default apiClient;
