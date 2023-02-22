import { lazy } from 'react';
import PublicLayouts from '../components/layouts/public-layouts';
import Loadable from '../components/ui-kits/loading/loadable';
import * as slug from './slug';

// project imports

// dashboard routing
const Home = Loadable(lazy(() => import('../pages/home/home')));
const CardDetails = Loadable(lazy(() => import('../pages/car-details/car-details')));



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
            path: "*",
            element: <Home />,
        }
    ],
};

export default PublicRoute;
