import { useRoutes } from 'react-router-dom';
import PrivateRoute from './private-route';
import PublicRoute from './public-route';


const config = {
    basename: '',
    defaultPath: ''
};

const userJSON = localStorage.getItem('finMyCarInfo');
const user = userJSON ? JSON.parse(userJSON) : null;


const Routings = () => {
    return useRoutes([PublicRoute, user ? PrivateRoute : {}], config.basename);
};

export default Routings;