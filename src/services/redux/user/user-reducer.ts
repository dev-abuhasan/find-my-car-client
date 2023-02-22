import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
    UserActionTypes,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    UserRegistrationTypes,

    User,
    UserRegister,
} from './user-types';

interface UserState {
    loading: boolean;
    user?: User;
    error?: string;
}

interface RegisterState {
    loading: boolean;
    register?: UserRegister;
    error?: string;
}

const initialUserState: UserState = {
    loading: false,
};

const initialRegisterState: RegisterState = {
    loading: false,
};

export const userReducer = (
    state = initialUserState,
    action: UserActionTypes
): UserState => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const registerReducer = (
    state = initialRegisterState,
    action: UserRegistrationTypes
): RegisterState => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, register: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
