import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-hot-toast';
import { headerConfig } from './configs';
// import toast from "react-hot-toast";

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_HOST,
    headers: headerConfig.headers,
});

export async function GetData(url: string, notification = true) {
    try {
        const response = await instance.get(url);
        if (notification) {
            toast.success(response?.data.message ? response?.data.message : "Success");
        }
        return response.data;
    } catch (error: unknown) {
        console.log("Get Error===>", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.data.items?.error) {
                toast.error(error.response.data.items.error);
            } else {
                toast.error(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                );
            }
        } else {
            toast.error(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    }
}

export const PostData = async (url: string, body: any, notification = true) => {
    try {
        let data = await axios.post(url, body);
        if (notification) {
            toast.success(data?.data.message ? data?.data.message : "Success");
        }
        return data;
    } catch (error: any) {
        console.log("Post Error===>", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.data.items?.error) {
                toast.error(error.response.data.items.error);
            } else {
                toast.error(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                );
            }
        } else {
            toast.error(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    }
};


export const PutData = async (url: string, body: any, notification = true) => {
    try {
        let data = await axios.post(url, body);
        if (notification) {
            toast.success(data?.data.message ? data?.data.message : "Success");
        }
        return data;
    } catch (error: any) {
        console.log("Put Error===>", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.data.items?.error) {
                toast.error(error.response.data.items.error);
            } else {
                toast.error(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                );
            }
        } else {
            toast.error(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    }
};

export const DeleteData = async (url: string, body: any, notification = true, confirm = true) => {
    try {
        if (confirm) {
            if (window.confirm('Are you sure to delete!')) {
                let data = await axios.delete(url, { data: body });
                if (data) {
                    toast.success(data?.data?.message ? data?.data?.message : "Success");
                }
                if (notification) {
                    toast.success(data?.data.message ? data?.data.message : "Success");
                }
                return data;
            }
        } else {
            let data = await axios.delete(url, { data: body });
            if (data) {
                toast.success(data?.data?.message ? data?.data?.message : "Success");
            }
            if (notification) {
                toast.success(data?.data.message ? data?.data.message : "Success");
            }
            return data;
        }

    } catch (error) {
        console.log("Delete Error===>", error);
        if (axios.isAxiosError(error)) {
            if (error.response?.data.items?.error) {
                toast.error(error.response.data.items.error);
            } else {
                toast.error(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                );
            }
        } else {
            toast.error(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    }
};