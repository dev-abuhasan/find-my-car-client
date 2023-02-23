import { Button } from '@mui/material';
import "./btn-style.scss";

const ClickBtn = ({ onClick = () => { }, children, sx, color }: any) => {
    const handleClick = (e: any) => {
        onClick(e)
    }
    return (
        <Button sx={{ ...sx, fontWeight: '700', letterSpacing: '2px', textTransform: 'capitalize' }} onClick={handleClick} className={`btn_click baloo_paaji  ${color ? color : 'text-dark'}`}>
            <svg className="svg">
                <rect className="rect" x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            {children}
        </Button >
    );
};

export default ClickBtn;