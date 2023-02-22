export interface User {
    id: number;
    email: string;
    password: string;
}

//user login
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
interface UserLoginRequestAction {
    type: typeof USER_LOGIN_REQUEST;
}
interface UserLoginSuccessAction {
    type: typeof USER_LOGIN_SUCCESS;
    payload: User;
}
interface UserLoginFailAction {
    type: typeof USER_LOGIN_FAIL;
    payload: string;
}

export type UserActionTypes =
    | UserLoginRequestAction
    | UserLoginSuccessAction
    | UserLoginFailAction;


//user register
export interface UserRegister {
    firstName: number;
    lastName: number;
    email: string;
    password: string;
}

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
interface UserRegisterRequestAction {
    type: typeof USER_REGISTER_REQUEST;
}
interface UserRegisterSuccessAction {
    type: typeof USER_REGISTER_SUCCESS;
    payload: UserRegister;
}
interface UserRegisterFailAction {
    type: typeof USER_REGISTER_FAIL;
    payload: string;
}

export type UserRegistrationTypes =
    | UserRegisterRequestAction
    | UserRegisterSuccessAction
    | UserRegisterFailAction;


