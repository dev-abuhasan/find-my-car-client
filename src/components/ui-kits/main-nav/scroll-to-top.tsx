import React from 'react';
import { AppContext } from '../../../services/context/app-context';
import { arrow_top_v1 } from '../../../services/utils/svg';

interface Props {
    id: string,
}

const ScrollToTop: React.FC<Props> = ({ id }: any) => {
    const { scrollTrue } = React.useContext(AppContext);
    return (
        <div className={`scrollToTop ${scrollTrue ? 'd-block' : 'd-none'}`}>
            <div className="scrollUp" >
                <a href={`#${id}`} >
                    {arrow_top_v1}
                </a>
            </div>
        </div>
    )
}

export default ScrollToTop;