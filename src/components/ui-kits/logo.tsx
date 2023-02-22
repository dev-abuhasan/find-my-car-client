import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    href?: any;
    typeImg?: boolean;
}

const Logo: React.FC<Props> = ({ href, typeImg }) => {
    return (
        <div>
            {typeImg ?
                <div>
                    img
                </div> :
                <Link className='text-primary text-decoration-none' to={href ? href : '/'} style={{ fontSize: '35px', fontWeight: 600 }}>
                    Find My Car
                </Link>
            }

        </div>
    );
};

export default Logo;
