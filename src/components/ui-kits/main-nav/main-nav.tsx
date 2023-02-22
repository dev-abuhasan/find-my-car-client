import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../../services/context/app-context';
import { home_v1 } from '../../../services/utils/svg';
import Logo from '../logo';
import './main-nav.scss';

const MainNav: React.FC = () => {
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
            path: '/',
            name: 'Home',
            icon: home_v1,
        },
    ]

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
                            <li className="nav-link" key={d.name + i}>
                                <Link to={d.path} className={`${pathname === d.path ? 'activeRoute' : ''}`}>
                                    {d.icon}
                                    {d.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default MainNav;
