import React from 'react';
import { Outlet } from 'react-router-dom';


const PrivateLayouts: React.FC = () => {
    return (
        <div>
            <h1>Layout Private</h1>
            <Outlet />

        </div>
    );
};

export default PrivateLayouts;