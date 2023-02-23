import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../../services/context/app-context';
import { home_v1 } from '../../../services/utils/svg';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import * as slug from '../../../routes/slug';
import Logo from '../logo';
import './main-nav.scss';
import ClickBtn from '../buttons/click-btn';
import { useSelector } from 'react-redux';
import { logout } from '../../../services/redux/user/user-actions';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

const MainNav: React.FC = () => {
    const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();
    const { user } = useSelector((state: any) => state.user);

    const { pathname } = useLocation();
    const { setScrollTrue } = React.useContext(AppContext);

    React.useEffect(() => {
        const scrollingChange = () => {
            const header = document.querySelector('.main-header');
            window.addEventListener('scroll', () => {
                const scrollPos = window.scrollY;
                if (scrollPos > 10) {
                    header?.classList.add('scrolled');
                } else {
                    header?.classList.remove('scrolled');
                }
            });
        };

        window.onscroll = () => {
            scrollingChange();
            if (window.scrollY > 10) {
                if (typeof setScrollTrue === 'function') {
                    return setScrollTrue(true);
                }
            }
            if (typeof setScrollTrue === 'function') {
                return setScrollTrue(false);
            }
        };
    }, [setScrollTrue]);

    const myRef = React.useRef(null);
    React.useEffect(() => {
        const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop);
        const executeScroll = () => scrollToRef(myRef);
        if (pathname === '/home') {
            executeScroll();
        } else if (pathname === '/about') {
            executeScroll();
        }
    }, [pathname]);

    const navList = [
        {
            path: slug.HOME,
            name: 'Home',
            icon: home_v1,
        },
        {
            path: slug.OFFER_CARS,
            name: 'Cars Offer',
            icon: <LocalOfferIcon />,
        },
        {
            path: slug.SIGNIN,
            name: 'Login',
            icon: <LoginIcon />,
        },
        {
            private: true,
            path: slug.DASHBOARD,
            name: 'Dashboard',
            icon: <DashboardIcon />,
        },
    ]
    const handleClick = () => {
        console.log('object');
        dispatch(logout());
    }
    return (
        <div className={`main-header px-1 `} ref={myRef}>
            <div className="container mx-auto d-flex align-items-center justify-content-between nav_bg_parent">
                <div className="logo" id="header_logo">
                    <Logo />
                </div>

                <input type="checkbox" className="menu-btn" id="menu-btn" />
                <label htmlFor="menu-btn" className="menu-icon">
                    <span className="menu-icon__line p"></span>
                </label>
                <ul className="nav-links m-0 d-flex align-items-center">
                    {
                        navList.map((d: any, i: number) =>
                            d.private ? <li className={`nav-link ${user ? 'd-block' : 'd-none'}`} key={d.name + i}>
                                <Link to={d.path} className={`${pathname === d.path ? 'activeRoute' : ''}`}>
                                    {d.icon}
                                    {d.name}
                                </Link>
                            </li> :
                                <li className={`nav-link`} key={d.name + i}>
                                    <Link to={d.path} className={`${pathname === d.path ? 'activeRoute' : ''}`}>
                                        {d.icon}
                                        {d.name}
                                    </Link>
                                </li>
                        )
                    }
                    {user && <li className={`nav-link`}>
                        <ClickBtn onClick={() => handleClick()}>
                            <img width="25px" className='me-2' src={user?.avatar} alt={user?.firstName} />
                            Logout
                        </ClickBtn>
                    </li>}
                </ul>
            </div>
        </div>
    );
};

export default MainNav;
