import React from 'react'
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/PacmanLoader";


export default function Spinner() {
    const override = css`
    display: block;
    margin: 2;    
    border-color: red;
`;
    return (
        <div className="sweet-loading spinner">
            <PacmanLoader
                css={override}
                size={25}
                color={"#36D7B7"}
                loading={true}
            />
        </div>
    )
}
