import React from 'react';
import { useParams } from 'react-router-dom';

const CarDetails: React.FC = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>Abu {id}</h1>
        </div>
    );
};

export default CarDetails;