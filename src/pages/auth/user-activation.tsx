import React from 'react';
import { useParams } from 'react-router-dom';
import ClickBtn from '../../components/ui-kits/buttons/click-btn';
import * as slug from '../../routes/slug';
import * as api from '../../services/axios/api';
import { PostData } from '../../services/axios/https';
import { AppContext } from '../../services/context/app-context';

const UserActivation: React.FC = () => {
    const { token } = useParams();
    const { setLoading } = React.useContext(AppContext);

    const verifyUser = async () => {
        setLoading(true);
        let post = await PostData(
            `${api.POST_ACTIVE}`,
            { token },
            true
        );
        if (post?.data?.items) {
            localStorage.setItem("finMyCarInfo", JSON.stringify(post?.data?.items));
            window.location.href = slug.DASHBOARD;
        }
        if (!post) {
            setLoading(false);
        }
        setLoading(false);
    }

    return (
        <div style={{ minHeight: '48vh' }} className="d-flex flex-column container justify-content-center align-items-center">
            <span className='text-primary display-5'>User Verifying ...</span>
            <ClickBtn onClick={() => verifyUser()}>
                Verify User
            </ClickBtn>
        </div>
    );
};

export default UserActivation;