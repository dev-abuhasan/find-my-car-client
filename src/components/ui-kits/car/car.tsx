import React, { useContext } from 'react';
import './car.scss';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';
import * as slug from '../../../routes/slug';
import ClickBtn from '../buttons/click-btn';
import { AppContext } from '../../../services/context/app-context';
import { useSelector } from 'react-redux';


interface CarProps {
    id: string;
    model?: string;
    brand?: string;
    color?: string;
    image?: string;
    offer?: any;
    price?: number;
    year?: string | number
}
const Car: React.FC<CarProps> = ({ id, model, color, brand, offer, image, price, year }) => {
    const { saveBookmarks } = useContext(AppContext);
    const { user } = useSelector((state: any) => state.user);

    const bookMarks = async (id: string) => {
        if (user) {
            saveBookmarks(id);
        } else {
            if (window.confirm('If you want to create book mark then you need to login')) {
                window.location.href = slug.SIGNIN;
            }
        }

    }
    return (
        <div className="rent-item active_1 mb-4 h-100 d-flex flex-column justify-content-between">
            <div>
                <div className='car-img position-relative'>
                    <div className='position-absolute w-100 d-flex justify-content-between'>
                        <div className={`bg-light p-1 mt-2 ms-2 rounded-circle border border-primary ${offer?.offerPrice < 1 ? 'opacity-0' : 'opacity-1'}`} title={`${offer?.inPercent}% off`}>

                            <LocalOfferIcon className='text-primary' />
                        </div>
                        <div className='bg-light p-1 mt-2 me-2 rounded-circle border border-primary' title={'Save as book mark'}>
                            <BookmarkIcon className='text-primary' onClick={() => bookMarks(id)} />
                        </div>
                    </div>
                    <img className="img-fluid mb-4" src={image} alt="" />
                </div>
                <h4 className="text-uppercase mb-4">{model} - {brand}</h4>
                <div className="d-flex justify-content-center">
                    <div className="px-2">
                        <i className="fa fa-car text-primary mr-1"></i>
                        <span>{year}</span>
                    </div>
                    -
                    <div className="px-2 border-left border-right">
                        <i className="fa fa-cogs text-primary mr-1"></i>
                        <span>{color}</span>
                    </div>
                    -
                    <div className="px-2">
                        <i className="fa fa-road text-primary mr-1"></i>
                        <span className='text-primary'>$ {price}</span>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column justify-content-around h-auto'>
                <div>
                    <div className={`d-flex justify-content-center mb-4 ${offer?.offerPrice > 1 ? 'opacity-1' : 'opacity-0'}`}>
                        <div className="px-2 border-left border-right">
                            <i className="fa fa-cogs text-primary mr-1"></i>
                            <span>Offer Price</span>
                        </div>
                        -
                        <div className="px-2">
                            <i className="fa fa-road text-primary mr-1"></i>
                            <span className='text-primary'>$ {price}</span>
                        </div>
                    </div>

                </div>
                <Link className="px-3 text-decoration-none" to={`${slug.CAR_DETAILS_P}/${id}`} >
                    <ClickBtn sx={{ width: '100%' }}>
                        view Details
                    </ClickBtn>
                </Link>
            </div>
        </div>
    );
};

export default Car;