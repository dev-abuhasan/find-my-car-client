import React from "react";
import { down_arrow_v1 } from "../../../services/utils/svg";

interface Props {
    children: React.ReactNode;
    button: any;
}

const HoverDropdown: React.FC<Props> = ({ children, button }) => {

    return (
        <div id="dropdown_hover" className="">
            <button className="drop-btn drop_btn">
                {button}
                {down_arrow_v1}
            </button>
            <div className="dropdown-content">
                {children}
            </div>
        </div>
    );
};

export default HoverDropdown;
