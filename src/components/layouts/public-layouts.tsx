import React from 'react';
import { Outlet } from 'react-router-dom';
import { HL_HEADER } from '../../services/utils/hash';
import MainNav from '../ui-kits/main-nav/main-nav';
import ScrollToTop from '../ui-kits/main-nav/scroll-to-top';
import Footer from './footer';
import SearchHistory from './search-history';


const PublicLayouts: React.FC = () => {
    return (
        <main id={HL_HEADER}>
            <header className='position-relative'>
                <MainNav />
            </header>
            <section className='parent_section'>
                <div className="overflow-hidden position-fixed" style={{ left: 'auto', right: '10px', top: '300px' }}>
                    <SearchHistory />
                </div>
                <Outlet />
            </section>
            <Footer />
            <ScrollToTop id={HL_HEADER} />
        </main>
    );
};

export default PublicLayouts;