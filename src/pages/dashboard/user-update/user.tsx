import React from 'react';
import { GetData, PutData, PostDataF } from '../../../services/axios/https';
import * as api from '../../../services/axios/api';
import Froms from '../../../components/ui-kits/froms/Froms';
import { Grid } from '@mui/material';
import * as validation from '../../../components/ui-kits/froms/validation/validation';
import { useSelector } from 'react-redux';
import { AppContext } from '../../../services/context/app-context';

export interface DataItem {
    avatar?: string;
    firstName?: String;
    lastName?: String;
    email?: string;
    _id?: string;
}
const User = () => {
    const state = useSelector((state: any) => state.user);
    const [user, setUser] = React.useState<DataItem>();
    const { setLoading } = React.useContext(AppContext);

    React.useEffect(() => {
        if (!user) {
            const data = async () => {
                let getData = await GetData(api.GET_USER_PROFILE, false);
                setUser(getData?.items);
            }
            data();
        }
    }, [user]);

    const defaultValues: any = {
        firstName: state?.user?.firstName,
        lastName: state?.user?.lastName,
        email: state?.user?.email,
        password: '*******',
    };
    const handleSubmit = async (val: any) => {
        await PutData(api.PUT_USER_PROFILE, val, true);
    };

    const defFileUpVal = {
        avater: ''
    };
    const fileUploadHandler = async (e: any) => {
        if (e?.avater) {
            setLoading(true);
            const formData = new FormData();
            formData.append('avatar', e?.avater);
            let update = await PostDataF(api.POST_UPLOAD_AVATAR, formData, true);
            if (update?.data?.items?.url) {
                await PutData(api.PUT_USER_PROFILE, { avatar: update?.data?.items?.url }, true);
                setUser(undefined);
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Update Profile</h1>
            <div className='d-flex justify-content-center'>
                <img src={user?.avatar} alt="" style={{ width: '150px' }} />

            </div>
            <div className='avater-update'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                    <Grid item xs={12} md={10} lg={8} sx={{ height: 'auto' }}>
                        <Froms
                            validationSchema={validation.file}
                            subBtn={{ btnName: 'Upload', btnIcon: 'upload', btnColor: 'primary', btnVariant: 'contained', xs: 12, md: 12, lg: 12, xl: 6 }}
                            resetFrom={false}
                            handleSubmit={fileUploadHandler}
                            defaultValues={defFileUpVal}
                            formStyle=""
                            shadow="1"
                            parentGrid={{ justifyContent: '' }}
                            inputFields={[
                                {
                                    type: 'upFile',
                                    label: '',
                                    name: 'avater',
                                    size: 'small',
                                    margin: 'normal',
                                    variant: 'outlined',
                                    sx: { color: '' },
                                    gridSizes: { xs: 12, md: 12, lg: 12, xl: 6 }
                                }
                            ]}
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                <Grid item xs={12} md={10} lg={8} sx={{ height: 'auto' }}>
                    <Froms
                        validationSchema={validation.user_signup}
                        subBtn={{ btnName: 'Submit', btnColor: 'primary', btnVariant: 'contained', xs: 12, md: 12, lg: 12, xl: 12 }}
                        resetFrom={false}
                        handleSubmit={handleSubmit}
                        defaultValues={defaultValues}
                        formStyle=""
                        shadow="1"
                        parentGrid={{ justifyContent: 'center' }}
                        marginTop="10px"
                        inputFields={[
                            {
                                type: 'text',
                                label: 'Enter first name',
                                name: 'firstName',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 12, lg: 6, xl: 6 }
                            },
                            {
                                type: 'text',
                                label: 'Enter last name',
                                name: 'lastName',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 12, lg: 6, xl: 6 }
                            },
                            {
                                disabled: true,
                                className: 'not_allowed',
                                type: 'email',
                                label: 'Email',
                                name: 'email',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 12, lg: 12, xl: 12 }
                            },
                            {
                                disabled: true,
                                className: 'not_allowed',
                                type: 'password',
                                label: 'Password',
                                name: 'password',
                                size: 'small',
                                margin: 'normal',
                                variant: 'outlined',
                                sx: { color: '' },
                                gridSizes: { xs: 12, md: 12, lg: 12, xl: 12 }
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default User;