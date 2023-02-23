import React from 'react';
import { GetData, DeleteData, PostDataF, PostData, } from '../../../services/axios/https';
import { DataItem } from '../../home/home';
import * as api from '../../../services/axios/api';
import DataTable from '../../../components/ui-kits/data-table/data-table';
import { Box, Grid, Pagination } from '@mui/material';
import Froms from '../../../components/ui-kits/froms/Froms';
import * as validation from '../../../components/ui-kits/froms/validation/validation';
import { AppContext } from '../../../services/context/app-context';

const AddCar = () => {
    const { setLoading } = React.useContext(AppContext);
    const [allCars, setAllCars] = React.useState<DataItem>();
    const [curr, setCurr] = React.useState(1);
    React.useEffect(() => {
        if (!allCars) {
            const data = async () => {
                let getData = await GetData(api.GET_CAR_BY_USER, false);
                setAllCars(getData?.items);
            }
            data();
        }
    }, [allCars]);
    const table = [
        { title: "Brand", dataIndex: "brand" },
        { title: "Model", dataIndex: "model" },
        { title: "Year", dataIndex: "year" },
        { title: "Color", dataIndex: "color" },
        { title: "AvailableColors", dataIndex: "availableColors" },
        { title: "Categories", dataIndex: "categories" },
        { title: "Location", dataIndex: "location" },
        {
            title: "Offer",
            dataIndex: "offer",
            render: (v: any) =>
                <div className='d'>
                    <span className='d-block'>type: {v.type}</span>
                    <span className='d-block'>Value: {v.value}</span>
                    <span className='d-block'>Current Price:{v.offerPrice}</span>
                </div>,

        },
        { title: "price", dataIndex: "price" },
        { title: "Image", dataIndex: "image", type: 'image' },
        { title: "Edit", type: 'update' },
        { title: "Delete", type: 'delete' },
    ];
    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurr(value);
        let getData = await GetData(`${api.GET_CAR_BY_USER}?pageNumber=${value}`, false);
        setAllCars(getData?.items);
    };
    const handleEdit = (e: any) => {
        console.log(e);
    };
    const handleDelete = async (obj: any) => {
        let data = await DeleteData(`${api.GET_CAR_BY_USER}/${obj._id}`, {}, false, true);
        if (data) {
            setAllCars(undefined);
        }
    }

    //add -cars
    const defaultValues: any = {
        brand: '',
        model: '',
        year: '',
        color: '',
        image: '',
        availableColors: '',
        categories: '',
        seats: '',
        price: '',
        countInStock: '',
        location: '',
        type: '',
        offer: {
            type: '',
            value: '',
            expiresAt: '',
        },
    };
    const handleSubmit = async (val: any) => {
        if (val?.image) {
            setLoading(true);
            const formData = new FormData();
            formData.append('car', val?.image);
            let update = await PostDataF(api.POST_UPLOAD_CAR, formData, true);

            const newObject = { ...val, image: update?.data?.items?.url, categories: [val.categories], availableColors: [val.availableColors], offer: { ...val.offer, type: val.type } };

            if (newObject) {
                let data = await PostData(api.POST_CAR_CREATE_BY_USER, newObject, true);
                console.log(data);
                if (data) {
                    setAllCars(undefined);
                }
            }
            setLoading(false);
        }
    };
    const handleSelData = (e: any) => {
        console.log(e);
    };

    return (
        <div>
            <h1>Add Car</h1>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                <Grid item xs={12} md={10} lg={10} sx={{ height: 'auto' }}>
                    <Froms
                        validationSchema={validation.add_car}
                        subBtn={{ btnName: 'Submit', btnColor: 'primary', btnVariant: 'contained', xs: 12, md: 6, lg: 6, xl: 3 }}
                        resetFrom={false}
                        handleSubmit={handleSubmit}
                        defaultValues={defaultValues}
                        formStyle=""
                        shadow="1"
                        parentGrid={{ justifyContent: 'center' }}
                        marginTop="10px"
                        inputFields={[
                            {
                                type: 'upFile',
                                label: '',
                                name: 'image',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'text',
                                label: 'Enter Brand',
                                name: 'brand',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'text',
                                label: 'Enter Model',
                                name: 'model',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'text',
                                label: 'Enter year',
                                name: 'year',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'text',
                                label: 'Enter color',
                                name: 'color',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'number',
                                label: 'Enter Seats',
                                name: 'seats',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'number',
                                label: 'Enter price',
                                name: 'price',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'number',
                                label: 'Enter countInStock',
                                name: 'countInStock',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 2 }
                            },
                            {
                                type: 'text',
                                label: 'Enter location',
                                name: 'location',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 4, lg: 4, xl: 3 }
                            },
                            {
                                type: 'number',
                                label: 'Enter offer',
                                name: `offer.value`,
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 6, lg: 6, xl: 2 }
                            },
                            {
                                type: 'datetime-local',
                                label: '',
                                name: `offer.expiresAt`,
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 6, lg: 6, xl: 3 }
                            },
                            {
                                type: 'select',
                                label: 'Select Extra Color',
                                name: 'availableColors',
                                size: 'small',
                                margin: 'normal',
                                selectValue: 'value',
                                handleReturnSelData: handleSelData,
                                selectLabel: 'label',
                                optionValues: [
                                    {
                                        value: 'white',
                                        label: 'White'
                                    },
                                    {
                                        value: 'red',
                                        label: 'Red'
                                    },
                                    {
                                        value: 'blue',
                                        label: 'Blue'
                                    },
                                    {
                                        value: 'green',
                                        label: 'Green'
                                    }
                                ],
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 6, lg: 6, xl: 3 }
                            },
                            {
                                type: 'select',
                                label: 'Select Category',
                                name: 'categories',
                                size: 'small',
                                margin: 'normal',
                                selectValue: 'value',
                                handleReturnSelData: handleSelData,
                                selectLabel: 'label',
                                optionValues: [
                                    {
                                        value: 'sedan',
                                        label: 'Sedan'
                                    },
                                    {
                                        value: 'family',
                                        label: 'Family'
                                    },
                                    {
                                        value: 'friends',
                                        label: 'Friends'
                                    },
                                    {
                                        value: 'travel',
                                        label: 'Travel'
                                    }
                                ],
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 6, lg: 6, xl: 3 }
                            },
                            {
                                type: 'select',
                                label: 'Select Offer Type',
                                name: `type`,
                                size: 'small',
                                margin: 'normal',
                                selectValue: 'value',
                                handleReturnSelData: handleSelData,
                                selectLabel: 'label',
                                optionValues: [
                                    {
                                        value: 'discount',
                                        label: 'Discount'
                                    },
                                    {
                                        value: 'free_accessory',
                                        label: 'Free'
                                    }
                                ],
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 6, lg: 6, xl: 3 }
                            },
                        ]}
                    />
                </Grid>
            </Grid>
            <div className='mt-3'>
                <DataTable
                    rowKey="_id"
                    columns={table}
                    dataSource={allCars?.cars}
                    deleteHandler={handleDelete}
                    editHandler={handleEdit}
                    paginationFalse
                />
                <Box sx={{ border: 1, margin: '10px 0 0 0', padding: '5px 0', borderColor: 'primary.main', display: 'flex', justifyContent: 'center' }}>
                    <Pagination count={allCars?.pages} page={curr} onChange={handleChange} />
                </Box>
            </div>
        </div>
    );
};

export default AddCar;