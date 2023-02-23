import { lazy } from 'react';
import PrivateLayouts from '../components/layouts/private-layouts';
import Loadable from '../components/ui-kits/loading/loadable';
import * as slug from './slug';

// project imports

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/dashboard')));
const AddCar = Loadable(lazy(() => import('../pages/dashboard/add-car/add-car')));
const Bookmarks = Loadable(lazy(() => import('../pages/dashboard/bookmarks/bookmarks')));
const User = Loadable(lazy(() => import('../pages/dashboard/user-update/user')));


const PrivateRoute = {
    path: '/',
    element: <PrivateLayouts />,
    children: [
        {
            path: slug.DASHBOARD,
            element: <Dashboard />,
        },
        {
            path: slug.ADD_CAR,
            element: <AddCar />,
        },
        {
            path: slug.BOOKMARKS,
            element: <Bookmarks />,
        },
        {
            path: slug.USER,
            element: <User />,
        },
    ],
};

export default PrivateRoute;
