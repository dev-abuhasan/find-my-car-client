import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    UserActionTypes,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    UserRegistrationTypes,
    User,
    UserRegister,
} from './user-types';

import * as api from '../../axios/api';
import * as slug from '../../../routes/slug';


export const login = (email: string, password: string): ThunkAction<void, {}, {}, UserActionTypes> => async (dispatch: Dispatch<UserActionTypes>) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data }: any = await axios.post<User>(`${api.POST_SIGNIN}`, {
            email,
            password,
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data?.items });
        console.log(data);
        toast.success(data?.message ? data?.message : 'SUCCESS!')
        localStorage.setItem("finMyCarInfo", JSON.stringify(data?.items));
        if (data?.items) {
            window.location.href = slug.DASHBOARD;
        }
    } catch (error: any) {
        if (error.response.data.items.error) {
            toast.error(error.response.data.items.error);
        } else {
            toast.error(error.response && error.response.data.message
                ? error.response.data.message
                : error.message);
        }

        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const logout = (): ThunkAction<void, {}, null, any> => async (
    dispatch: Dispatch
) => {
    localStorage.removeItem('finMyCarInfo');
    window.location.href = slug.SIGNIN;
    dispatch({ type: USER_LOGIN_FAIL });
};



export const register = (
    firstName: string,
    lastName: string,
    email: string,
    password: string
): ThunkAction<void, {}, {}, UserRegistrationTypes> => async (
    dispatch: Dispatch<UserRegistrationTypes>
) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });

            const { data }: any = await axios.post<UserRegister>(`${api.POST_SIGNUP}`, {
                firstName,
                lastName,
                email,
                password,
            });
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data?.items });
            toast.success(data?.message ? data?.message : 'SUCCESS!', { duration: 10000 });
            data?.message && toast.error('Please Check Also Spam Folder!', { duration: 15000 });

        } catch (error: unknown) {
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

            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error occurred',
            });
        }
    };