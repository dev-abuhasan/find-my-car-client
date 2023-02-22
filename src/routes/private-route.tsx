import { lazy } from 'react';
import PrivateLayouts from '../components/layouts/private-layouts';
import Loadable from '../components/ui-kits/loading/loadable';
import * as slug from './slug';

// project imports

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/dashboard')));


const PrivateRoute = {
    path: '/',
    element: <PrivateLayouts />,
    children: [
        {
            path: slug.DASHBOARD,
            element: <Dashboard />,
        },
    ],
};

export default PrivateRoute;
