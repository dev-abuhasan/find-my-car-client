import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { registerReducer, userReducer } from './user/user-reducer';

const rootReducer = combineReducers({
    user: userReducer,
    register: registerReducer,
});

const userInfoFromStorage = localStorage.getItem('finMyCarInfo');
const user = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null;

const preloadedState: PreloadedState<any> = {
    user: { user: user },
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
    preloadedState,
});

export default store;
