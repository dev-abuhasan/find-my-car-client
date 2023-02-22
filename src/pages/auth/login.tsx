import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Froms from '../../components/ui-kits/froms/Froms';
import * as validation from '../../components/ui-kits/froms/validation/validation';
import { login } from '../../services/redux/user/user-actions';
import { ThunkDispatch } from 'redux-thunk';
import { UserActionTypes } from '../../services/redux/user/user-types';
import { AppContext } from '../../services/context/app-context';
import { Link } from 'react-router-dom';
import * as slug from '../../routes/slug';


const Login: React.FC = () => {
    const dispatch: ThunkDispatch<{}, {}, UserActionTypes> = useDispatch();
    const { loading } = useSelector((state: any) => state.user);
    const { setLoading } = React.useContext(AppContext);

    React.useEffect(() => {
        setLoading(loading);
    }, [loading, setLoading])

    const defaultValues: any = {
        email: '',
        password: '',
    };
    const handleSubmit = async (val: any) => {
        dispatch(login(val.email, val.password));
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6">
                    <img className='img-fluid' src="https://res.cloudinary.com/dydkdsasz/image/upload/v1677090248/car/khf40m4xhmyntzbdy7h4.png" alt="" />
                </div>
                <div className="col-md-6">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
                        <Grid item xs={12} md={10} lg={8} sx={{ height: 'auto' }}>
                            <div className='text-center'>
                                <h3>Sign In</h3>
                                <p className='text-muted'>Sign in with your email & password!</p>
                                <div>
                                    Don't have account?
                                    <Link to={slug.SIGNUP} className="ms-2 text-decoration-none fw-bold">Sign Up as an user</Link>
                                </div>
                            </div>
                            <Froms
                                validationSchema={validation.user_signin}
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
            </div>
        </div>
    );
};

export default Login;