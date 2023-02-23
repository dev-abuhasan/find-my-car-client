import React from 'react';
import Slider from 'react-slick';
import { arrow_left_v1, arrow_right_v1 } from "../../../services/utils/svg";
import Car from './car';

const NextArrow = ({ onClick }: any) => {
    return (
        <div className={`${'btn'} ${'nextBtn cmnBtn'}`} onClick={onClick}>
            {arrow_left_v1}
        </div>
    );
};
// carousel previous arrow icon on the left position
const PrevArrow = ({ onClick }: any) => {
    return (
        <div className={`${'btn'} ${'prevBtn cmnBtn'}`} onClick={onClick}>
            {arrow_right_v1}
        </div>
    );
};

interface Props {
    data: any;
}
const MultiCar: React.FC<Props> = ({ data }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 0,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };

    return (
        <div id="multi-carousel">
            <Slider {...settings} className="product-carousel bg-light h-100">
                {data?.map((d: any, i: number) =>
                    <div className={`p-2 h-100`} key={i}>
                        <Car id={d._id} model={d.model} brand={d.brand} color={d.color} offer={d.offer} price={d.price} year={d.year} image={d.image} />
                    </div>
                )}
            </Slider>
        </div>
    );
};

export default MultiCar;