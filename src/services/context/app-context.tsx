import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import * as api from '../axios/api';
import { PostData } from '../axios/https';

interface Props {
    children: React.ReactNode;
}
interface AppContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    scrollTrue: boolean;
    setScrollTrue: Dispatch<SetStateAction<boolean>>;
    saveBookmarks: Dispatch<SetStateAction<any>>;
}

export const AppContext = createContext<AppContextProps>({
    loading: false,
    setLoading: () => { },
    scrollTrue: false,
    setScrollTrue: () => { },
    saveBookmarks: () => { }
});

const AppContextProvider: React.FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [scrollTrue, setScrollTrue] = useState(false);

    const saveBookmarks = async (id: string) => {
        const userInfoFromStorage = localStorage.getItem('finMyCarInfo');
        if (userInfoFromStorage) {
            if (id) {
                await PostData(`${api.POST_BOOKMARKS_CREATE}/${id}`, {}, true);
            }
        }

    };

    const contextValue: AppContextProps = {
        loading,
        setLoading,
        scrollTrue,
        setScrollTrue,
        saveBookmarks
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
