import { lazy } from 'react';
import PublicLayouts from '../components/layouts/public-layouts';
import Loadable from '../components/ui-kits/loading/loadable';
import * as slug from './slug';

// project imports

// dashboard routing
const Home = Loadable(lazy(() => import('../pages/home/home')));
const CardDetails = Loadable(lazy(() => import('../pages/car-details/car-details')));
const Login = Loadable(lazy(() => import('../pages/auth/login')));
const Signup = Loadable(lazy(() => import('../pages/auth/signup')));
const UserActivation = Loadable(lazy(() => import('../pages/auth/user-activation')));


const PublicRoute = {
    path: '/',
    element: <PublicLayouts />,
    children: [
        {
            path: slug.HOME,
            element: <Home />,
        },
        {
            path: slug.CAR_DETAILS,
            element: <CardDetails />,
        },
        {
            path: slug.SIGNIN,
            element: <Login />,
        },
        {
            path: slug.SIGNUP,
            element: <Signup />,
        },
        {
            path: slug.USER_ACTIVE,
            element: <UserActivation />,
        },
        {
            path: "*",
            element: <Home />,
        }
    ],
};

export default PublicRoute;
