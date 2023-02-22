import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface Props {
    children: React.ReactNode;
}
interface AppContextProps {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    scrollTrue: boolean;
    setScrollTrue: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
    loading: false,
    setLoading: () => { },
    scrollTrue: false,
    setScrollTrue: () => { },
});

const AppContextProvider: React.FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [scrollTrue, setScrollTrue] = useState(false);

    const contextValue: AppContextProps = {
        loading,
        setLoading,
        scrollTrue,
        setScrollTrue
    };

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
