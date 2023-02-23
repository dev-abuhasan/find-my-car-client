import React from 'react';
import * as api from '../../services/axios/api';
import { Box, Slider, Pagination, TextField, Menu } from '@mui/material';
import { GetData } from '../../services/axios/https';
import ClickBtn from '../../components/ui-kits/buttons/click-btn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Car from '../../components/ui-kits/car/car';
import CarCarousel from '../../components/ui-kits/car/car-carousel';
import MultiCar from '../../components/ui-kits/car/multi-car';

export interface DataItem {
    pages?: number;
    maxPriceCar?: number;
    maxSeats?: number;
    page?: number;
    count?: number;
    cars?: any;
}
export interface Filters {
    keyword: any;
    sortPrice: any;
    price: any;
    seats: any;
    startDate: any;
    endDate: any;
}

const Home: React.FC = () => {
    const [allCars, setAllCars] = React.useState<DataItem>({});
    const [topCars, setTopCars] = React.useState<DataItem>();
    const [likeCars, setLikeCars] = React.useState<DataItem>();
    const [recommendCars, setRecommendCars] = React.useState<DataItem>();
    const [curr, setCurr] = React.useState(1);
    const [prices, setPrices] = React.useState<number[]>([0, 0]);
    const [seats, setSeats] = React.useState<number[]>([0, 0]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    // console.log(allCars);
    const [filter, setFilter] = React.useState<Filters>({
        keyword: null,
        sortPrice: null,
        price: null,
        seats: null,
        startDate: null,
        endDate: null,
    });

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurr(value);
    };

    React.useEffect(() => {
        const data = async () => {
            let query = `${api.GET_ALL_CARS}?pageNumber=${curr}`;
            if (filter.keyword) query += `&keyword=${filter.keyword}`;
            if (filter.sortPrice) query += '&sortPrice=highToLow';
            if (filter.price) query += `&price=${filter.price}`;
            if (filter.seats) query += `&seats=${filter.seats}`;
            if (filter.startDate) query += `&startDate=${filter.startDate}`;
            if (filter.endDate) query += `&endDate=${filter.endDate}`;
            let getData = await GetData(query, false);
            setAllCars(getData?.items);
            setPrices([0, getData?.items?.maxPriceCar]);
            setSeats([0, getData?.items?.maxSeats]);
        }
        data();
    }, [curr, filter]);

    React.useEffect(() => {
        if (!recommendCars) {
            const data = async () => {
                let recommend = await GetData(api.GET_CARS_RECOMMEND, false);
                setRecommendCars(recommend?.items);
            }
            data();
        }

        if (!likeCars) {
            const data = async () => {

                let MostLikeCar = await GetData(api.GET_CARS_MOST_LIKE, false);
                setLikeCars(MostLikeCar?.items);
            }
            data();
        }
        if (!topCars) {
            const data = async () => {
                let getData = await GetData(api.GET_CARS_TOP_BY_USER, false);
                setTopCars(getData?.items);
            }
            data();
        }
    }, [likeCars, recommendCars, topCars]);

    const priceRange = (event: Event, newValue: number | number[]) => {
        setPrices(newValue as number[]);
    };
    const seatsRange = (event: Event, newValue: number | number[]) => {
        setSeats(newValue as number[]);
    };
    const rangeSearch = async () => {
        let query = `${api.GET_ALL_CARS}?pageNumber=${curr}`;
        if (filter.keyword) query += `&keyword=${filter.keyword}`;
        if (filter.sortPrice) query += '&sortPrice=highToLow';
        if (filter.price) query += `&price=${filter.price}`;
        if (filter.seats) query += `&seats=${filter.seats}`;
        if (filter.startDate) query += `&startDate=${filter.startDate}`;
        if (filter.endDate) query += `&endDate=${filter.endDate}`;
        if (prices) query += `&priceStart=${prices[0]}&priceEnd=${prices[1]}`;
        if (seats) query += `&seatsStart=${seats[0]}&seatsEnd=${seats[1]}`;

        let getData = await GetData(query, false);
        setAllCars(getData?.items);
        setPrices([0, getData?.items?.maxPriceCar]);
        setSeats([0, getData?.items?.maxSeats]);
    }

    //filter menu 
    const open = Boolean(anchorEl);
    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const carouselData = (Array.isArray(topCars) && topCars.slice(0, 3)) || [];


    return (
        <div className='container'>
            {topCars && <CarCarousel data={carouselData} likeCars={likeCars} />}

            <div className="filter-data mt-4">
                <ClickBtn sx={{ width: 'auto' }} onClick={(e: any) => handleClick(e)}>
                    <FilterAltIcon />
                    Filters - Data
                </ClickBtn>
                <Menu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <div className='p-3'>
                        <div className="row" style={{ maxWidth: '400px' }}>
                            <div className="col-md-6 mb-2">
                                <TextField size="small" id="standard-basic" label="Search..." variant="outlined"
                                    onChange={(e: any) =>
                                        setFilter({ ...filter, keyword: e.target.value })
                                    }
                                    sx={{ width: '100%' }}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <TextField
                                    size="small" id="standard-basic"
                                    label="Price..." variant="outlined"
                                    type="number"
                                    onChange={(e: any) =>
                                        setFilter({ ...filter, price: e.target.value })
                                    }
                                    sx={{ width: '100%' }}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <TextField
                                    size="small" id="standard-basic"
                                    label="Seats..." variant="outlined"
                                    type="number"
                                    onChange={(e: any) =>
                                        setFilter({ ...filter, seats: e.target.value })
                                    }
                                    sx={{ width: '100%' }}
                                />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label htmlFor="priceLowToHigh" style={{}}>Price Low To High&nbsp;</label>
                                <TextField
                                    id="priceLowToHigh"
                                    size="small"
                                    variant="outlined" type="checkbox"
                                    className="formCheckBox"
                                    onChange={(e: any) =>
                                        setFilter({ ...filter, sortPrice: e.target?.checked })
                                    }
                                    sx={{ width: 'auto' }}

                                />
                            </div>
                        </div>
                        <div className="date-filter row" style={{ maxWidth: '400px' }}>
                            <div className="col-md-6">
                                <label htmlFor="startDate" style={{}}>Start Date:</label>
                                <TextField
                                    size="small" id="startDate"
                                    // label="Seats..." 
                                    variant="outlined"
                                    type="date"
                                    onChange={(e: any) =>
                                        setFilter({ ...filter, startDate: e.target.value })
                                    }
                                    sx={{ width: '100%' }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="endDate" style={{}}>End Date:</label>
                                <TextField
                                    size="small" id="endDate"
                                    // label="Seats..." 
                                    variant="outlined"
                                    type="date"
                                    onChange={(e: any) =>
                                        setFilter({ ...filter, endDate: e.target.value })
                                    }
                                    sx={{ width: '100%' }}
                                />
                            </div>
                        </div>
                        <div className='row' style={{ maxWidth: '300px' }}>
                            <div className='col-md-6 px-3 pt-3'>
                                <label htmlFor="">Price Range:</label>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={prices}
                                    onChange={priceRange}
                                    valueLabelDisplay="auto"
                                    min={1000}
                                    max={allCars?.maxPriceCar} // or max={Infinity}
                                    step={10000}
                                // getAriaValueText={'A'}
                                />
                            </div>
                            <div className='col-md-6 px-3 pt-3'>
                                <label htmlFor="">Seats Range:</label>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={seats}
                                    onChange={seatsRange}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={allCars?.maxSeats} // or max={Infinity}
                                    step={1}
                                // getAriaValueText={'A'}
                                />
                            </div>
                            <div className="col-md-12 pt-3 d-flex justify-content-between">
                                <ClickBtn sx={{ width: 'auto' }} onClick={() => rangeSearch()}>
                                    Price - Seats
                                </ClickBtn>
                                <ClickBtn sx={{ minWidth: '100px', margin: '0 5px' }} onClick={() => handleClose()}>
                                    Close
                                </ClickBtn>
                            </div>
                        </div>
                    </div>
                </Menu>
            </div>
            <div className=' mt-2'>
                <div className='row'>
                    {allCars?.cars?.map((d: any, i: number) =>
                        <div key={i} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                            <Car id={d._id} model={d.model} brand={d.brand} color={d.color} offer={d.offer} price={d.price} year={d.year} image={d.image} />
                        </div>
                    )}
                </div>
                <Box sx={{ border: 1, margin: '10px 0 0 0', padding: '5px 0', borderColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={allCars?.pages} page={curr} onChange={handleChange} />
                </Box>
            </div>
            <div className={`mt-3 `}>
                <h2 className='text-center'>Your Recommendation</h2>
                <MultiCar data={recommendCars} />
            </div>
        </div >
    );
};

export default Home;