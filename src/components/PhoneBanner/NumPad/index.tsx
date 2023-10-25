import React from 'react';

import "./index.scss"

const NumPad = ({buttonClassName}: {buttonClassName: string}) => {
    const numPadMap: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return (
        <div className="numPad">
            {numPadMap.map((element: string) => {
                return (<button value={element} key={element} className={buttonClassName} type="button">{element}</button>)
            })}
        </div>
    );
};

export default NumPad;