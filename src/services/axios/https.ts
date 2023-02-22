import axios, { AxiosInstance } from 'axios';
import { headerConfig } from './configs';
// import toast from "react-hot-toast";

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: headerConfig.headers,
});

export async function GetData(url: string, notification = true) {
    try {
        const response = await instance.get(url);
        return response.data;
    } catch (error: unknown) {
        console.error(error);
    }
}