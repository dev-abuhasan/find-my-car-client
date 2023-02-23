import { Box, Grid, InputAdornment, Pagination, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import * as api from '../../services/axios/api';
import { GetData } from '../../services/axios/https';
import { Prev } from 'react-bootstrap/esm/PageItem';
interface DataItem {
    pages?: number;
    page?: number;
    count?: number;
    cars?: any;
}
interface Filters {
    keyword: any;
    sortPrice: any;
    price: any;
    seats: any;
    startDate: any;
    endDate: any;
    priceStart: any;
    priceEnd: any;
    seatsStart: any;
    seatsEnd: any
}

const Home: React.FC = () => {
    const [allCars, setAllCars] = React.useState<DataItem>({});
    console.log(allCars);
    const [curr, setCurr] = React.useState(1);
    const [filter, setFilter] = React.useState<Filters>({
        keyword: null,
        sortPrice: null,
        price: null,
        seats: null,
        startDate: null,
        endDate: null,
        priceStart: null,
        priceEnd: null,
        seatsStart: null,
        seatsEnd: null
    });
    console.log(filter);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurr(value);
    };

    React.useEffect(() => {
        const data = async () => {
            let getData = await GetData(`${api.GET_ALL_CARS}?pageNumber=${curr}&keyword=${filter.keyword ? filter.keyword : ''}&sortPrice=${filter.sortPrice ? 'highToLow' : ''}`, false);
            setAllCars(getData?.items);
        }
        data();
    }, [curr, filter.keyword, filter.sortPrice]);




    return (
        <div className='container'>
            <div>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: '' }}>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
                        <TextField size="small" id="standard-basic" label="Search..." variant="outlined"
                            onChange={(e: any) =>
                                setFilter({ ...filter, keyword: e.target.value })
                            }
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
                        <TextField
                            size="small" id="standard-basic"
                            label="Price..." variant="outlined"
                            type="number"
                            onChange={(e: any) =>
                                setFilter({ ...filter, price: e.target.value })
                            }
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
                        <TextField
                            size="small" id="standard-basic"
                            label="Seats..." variant="outlined"
                            type="number"
                            onChange={(e: any) =>
                                setFilter({ ...filter, seats: e.target.value })
                            }
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto', display: 'flex', alignItems: 'center' }}>
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
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: '' }}>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
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
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
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
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
                        <label htmlFor="priceStart" style={{}}>Price Start:</label>
                        <TextField
                            size="small" id="priceStart"
                            // label="Seats..." 
                            variant="outlined"
                            type="number"
                            onChange={(e: any) =>
                                setFilter({ ...filter, priceStart: e.target.value })
                            }
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
                        <label htmlFor="priceEnd" style={{}}>Price End:</label>
                        <TextField
                            size="small" id="priceEnd"
                            // label="Seats..." 
                            variant="outlined"
                            type="number"
                            onChange={(e: any) =>
                                setFilter({ ...filter, priceEnd: e.target.value })
                            }
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
                        <label htmlFor="seatsStart" style={{}}>Seats Start:</label>
                        <TextField
                            size="small" id="seatsStart"
                            // label="Seats..." 
                            variant="outlined"
                            type="number"
                            onChange={(e: any) =>
                                setFilter({ ...filter, seatsStart: e.target.value })
                            }
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3} lg={2} sx={{ height: 'auto' }}>
                        <label htmlFor="seatsEnd" style={{}}>Seats End:</label>
                        <TextField
                            size="small" id="seatsEnd"
                            // label="Seats..." 
                            variant="outlined"
                            type="number"
                            onChange={(e: any) =>
                                setFilter({ ...filter, seatsEnd: e.target.value })
                            }
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ border: 1, margin: '10px 0 0 0', padding: '5px 0', borderColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={allCars?.pages} page={curr} onChange={handleChange} />
                </Box>
            </div>
        </div >
    );
};

export default Home;