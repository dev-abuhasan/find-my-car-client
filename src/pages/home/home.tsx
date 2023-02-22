import React from 'react';
import { GetData } from '../../services/axios/https';
import * as validation from '../../components/ui-kits/froms/validation/validation';
import { Grid } from '@mui/material';
import Froms from '../../components/ui-kits/froms/Froms';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Home: React.FC = () => {

    React.useEffect(() => {
        const data = async () => {
            let getData = await GetData(`/cars/offers-cars`);
            console.log(getData);
        }
        data();
    }, []);

    const defaultValues: any = {
        zilla: 'Bogura',
        password: '',
        email: 'abu@gmail.com',
        terms: false,
        gender: false,
        selectVal: '',
        addNote: '',
    };
    const defFileUpVal = {
        test: ''
    };
    const handleSubmit = async (val: any) => {
        console.log('Submit btn', val);
    };
    const handleSelData = (e: any) => {
        console.log(e);
    };

    const multipleArrItems = [
        { id: 1, name: 'Oliver Hansen' },
        { id: 2, name: 'Van Henry' },
        { id: 3, name: 'April Tucker' },
        { id: 4, name: 'Ralph Hubbard' },
        { id: 5, name: 'Omar Alexander' },
        { id: 6, name: 'Carlos Abbott' },
        { id: 7, name: 'Miriam Wagner' },
        { id: 8, name: 'Virginia Andrews' },
        { id: 9, name: 'Kelly Snyder' }
    ];
    const [file, setFile] = React.useState(null);
    const fileUploadHandler = (e: any) => {
        console.log(e);
        setFile(e.test);
    };

    return (
        <div className='container'>
            <h1>Home Page</h1>
            <Grid item xs={12} md={6}>
                <Froms
                    validationSchema={validation.admin_view_zilla_test}
                    subBtn={{ btnName: 'Save', btnIcon: 'save', btnColor: 'primary', btnVariant: 'contained', xs: 12, md: 12, lg: 12, xl: 6 }}
                    resetFrom={false}
                    handleSubmit={handleSubmit}
                    defaultValues={defaultValues}
                    formStyle=""
                    shadow="1"
                    parentGrid={{ justifyContent: 'center' }}
                    marginTop="10px"
                    inputFields={[
                        {
                            disabled: true,
                            className: 'not_allowed',
                            type: 'text',
                            label: 'Add Zilla Name',
                            name: 'zilla',
                            size: 'small',
                            margin: 'normal',
                            variant: 'outlined',
                            sx: { color: '' },
                            gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                        },
                        {
                            type: 'password',
                            label: 'Password',
                            name: 'password',
                            size: 'small',
                            margin: 'normal',
                            variant: 'outlined',
                            sx: { color: '' },
                            gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                        },
                        {
                            type: 'email',
                            label: 'Email',
                            name: 'email',
                            size: 'small',
                            margin: 'normal',
                            variant: 'outlined',
                            sx: { color: '' },
                            gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                        },
                        {
                            type: 'checkbox',
                            label: 'Checkbox',
                            name: 'terms',
                            size: 'small',
                            margin: 'normal',
                            variant: 'outlined',
                            sx: { color: '' },
                            gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                        },
                        {
                            type: 'radio',
                            label: 'Gender',
                            name: 'gender',
                            size: 'small',
                            margin: 'normal',
                            variant: 'outlined',
                            sx: { color: '' },
                            gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                        },
                        {
                            type: 'select',
                            label: 'Select Currency',
                            name: 'selectVal',
                            size: 'small',
                            margin: 'normal',
                            variant: 'outlined',
                            selectValue: 'value',
                            handleReturnSelData: handleSelData,
                            selectLabel: 'label',
                            optionValues: [
                                {
                                    value: 'USD',
                                    label: '$'
                                },
                                {
                                    value: 'EUR',
                                    label: '€'
                                },
                                {
                                    value: 'BTC',
                                    label: '฿'
                                },
                                {
                                    value: 'JPY',
                                    label: '¥'
                                }
                            ],
                            sx: { color: '' },
                            gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                        },

                        {
                            type: 'textArea',
                            label: 'Add Note',
                            name: 'addNote',
                            maxRows: 4,
                            size: 'small',
                            margin: 'normal',
                            variant: 'outlined',
                            inputEndIcon: <VisibilityIcon />,
                            sx: { color: '' },
                            gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                        }
                    ]}
                />
            </Grid>
        </div>
    );
};

export default Home;