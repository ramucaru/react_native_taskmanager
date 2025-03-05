import { Task } from "@/app/(tabs)/task";
import apiClient from "./apiClient"

export const createTask = async (payload: Task) => {
    try {
        const response = await apiClient.post("/task/create-task", payload);
        return response.data;
    } catch (error) {
        throw new Error(error.message)
    }
}


export const getTask_all_Task = async () => {
    try {
        const response = await apiClient.get("/task/getall-task");
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getTask = async (id: any) => {
    try {
        const response = await apiClient.get(`/task/get-task/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const editTask = async (id: any, payload: Task) => {
    try {
        const response = await apiClient.patch(`/task/update-task/${id}`, payload);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteTask = async (id: any) => {
    try {
        const response = await apiClient.delete(`/task/delete-task/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}