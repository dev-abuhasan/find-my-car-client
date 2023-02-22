import { useRoutes } from 'react-router-dom';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';


const config = {
    basename: '',
    defaultPath: ''
};

// export const user_check = JSON.parse(localStorage.getItem('finMyCarInfo') || '');

const Routings = () => {
    return useRoutes([PublicRoute, PrivateRoute], config.basename);
};

export default Routings;