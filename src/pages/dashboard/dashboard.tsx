import React from 'react';
import { GetData } from '../../services/axios/https';
import { DataItem } from '../home/home';
import * as api from '../../services/axios/api';
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Dashboard: React.FC = () => {
    const { user } = useSelector((state: any) => state.user);
    const [topCars, setTopCars] = React.useState<DataItem[]>();
    React.useEffect(() => {
        if (!topCars) {
            const data = async () => {
                let getData = await GetData(api.GET_CARS_TOP_BY_USER, false);
                setTopCars(getData?.items);
            }
            data();
        }
    }, [topCars]);
    const brand = topCars?.map((d: any) => d.brand);
    const viewCount = topCars?.map((d: any) => d.viewCount);

    const labels = brand ? brand : [];
    const data = {
        labels,
        datasets: [
            {
                id: 1,
                label: '',
                data: viewCount ? viewCount : [],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Top Cars List',
            },
        },
    };
    return (
        <div>
            <div className="row justify-content-center">
                <div className='col-xl-8 col-xl-6'>
                    <div className="row">
                        <div className="col-md-3 border-primary  d-flex flex-column justify-content-center align-items-center">
                            <img src={user?.avatar} alt="" width={'150px'} />
                        </div>
                        <div className="col-md-9">
                            <div className='user-info border p-3 d-flex flex-column justify-content-center'>
                                <span className="display-5">{user?.firstName} {user?.lastName}</span>
                                <p className='text-primary'>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bar-chart pt-3 w-100 overflow-hidden'>
                <div className='row justify-content-center'>
                    <div className="col-md-6">
                        <Bar options={options} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;