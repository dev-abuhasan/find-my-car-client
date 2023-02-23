import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import ClickBtn from '../buttons/click-btn';
import * as slug from '../../../routes/slug';

interface Props {
    data: any;
    likeCars?: any;
}

const CarCarousel: React.FC<Props> = ({ data, likeCars }) => {
    const concat = likeCars?.concat(data);
    return (
        <Carousel fade>
            {concat?.map((d: any, i: number) =>
                <Carousel.Item key={i}>
                    <img
                        className="d-block w-100"
                        src={d.image}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <div className="content">
                            <h3>{d?.model} - {d?.brand}</h3>
                            <p>
                                {d?.year} - {d?.price} -  {d?.color}
                            </p>
                            <Link className="px-3 text-decoration-none " to={`${slug.CAR_DETAILS_P}/${d?._id}`} >
                                <ClickBtn sx={{ width: 'auto', }} color="text-light">
                                    view Details
                                </ClickBtn>
                            </Link>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            )}
        </Carousel >
    );
}

export default CarCarousel;