import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui-kits/logo';
import './footer.scss';

const Footer: React.FC = () => {
    return (
        <footer id="footer" className="">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6  footer-contact">
                            <div className="footer-card text-muted pe-4">
                                <Logo />
                                <div className="">
                                    <h4>Powered by ZAAG Systems Limited</h4>
                                    <span className="text-muted">For any queries, suggestions or feedback <br /> Contact us on our socials</span>
                                </div>
                                <div className="mt-3">
                                    <h4 className="">Follow us on</h4>
                                    <div className="social-links">
                                        <Link to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                            </svg>
                                        </Link>
                                        <Link to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                                            </svg>
                                        </Link>

                                        <Link to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                                                <line x1="8" y1="11" x2="8" y2="16"></line>
                                                <line x1="8" y1="8" x2="8" y2="8.01"></line>
                                                <line x1="12" y1="16" x2="12" y2="11"></line>
                                                <path d="M16 16v-3a2 2 0 0 0 -4 0"></path>
                                            </svg>
                                        </Link>
                                        <Link to="/">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                                                <circle cx="12" cy="12" r="3"></circle>
                                                <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-lg-2 col-md-5 footer-links">
                            <div><h4>Stay With Us</h4></div>
                            <ul>
                                <li>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        News
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 footer-links">
                            <div><h4>About Us</h4></div>
                            <ul>
                                <li>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        News
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6 footer-links">
                            <div><h4>Contact Us</h4></div>
                            <ul>
                                <li>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">
                                        News
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div className="container-fluid  d-flex justify-content-center align-items-center py-4 copyRight">
                <div className="copyright text-center">
                    &copy; 2023 - {(new Date().getFullYear())} Copyright <span><span>dev.abuhasan</span></span>. All Rights Reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;