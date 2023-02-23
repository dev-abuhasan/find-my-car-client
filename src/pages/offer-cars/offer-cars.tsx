import React from 'react';
import * as api from '../../services/axios/api';
import { DataItem } from '../home/home';
import { Box, Pagination } from '@mui/material';
import { GetData } from '../../services/axios/https';
import Car from '../../components/ui-kits/car/car';

const OfferCars: React.FC = () => {
    const [offerCar, setOfferCar] = React.useState<DataItem>();
    const [curr, setCurr] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurr(value);
        console.log(value);
        if (value) {
            const data = async () => {
                let recommend = await GetData(`${api.GET_CARS_OFFERS}?pageNumber=${value}`, false);
                setOfferCar(recommend?.items);
            }
            data();
        }
    };

    React.useEffect(() => {
        if (!offerCar) {
            const data = async () => {
                let recommend = await GetData(`${api.GET_CARS_OFFERS}`, false);
                setOfferCar(recommend?.items);
            }
            data();
        }

    }, [offerCar]);

    return (
        <div className='container'>
            <div className=' mt-2'>
                <div className='row'>
                    {offerCar?.cars?.map((d: any, i: number) =>
                        <div key={i} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <Car id={d._id} model={d.model} brand={d.brand} color={d.color} offer={d.offer} price={d.price} year={d.year} image={d.image} />
                        </div>
                    )}
                </div>
                <Box sx={{ border: 1, margin: '10px 0 0 0', padding: '5px 0', borderColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={offerCar?.pages} page={curr} onChange={handleChange} />
                </Box>
            </div>
        </div>
    );
};

export default OfferCars;