import React from 'react';

import NumPad from "../NumPad";

const Keyboard = ({buttonClassName}: {buttonClassName: string}) => {
    return (
        <div>
            <NumPad buttonClassName={buttonClassName}/>
            <button className={buttonClassName} value="clear" type="button">CLEAR</button>
            <button className={buttonClassName} value="0" type="button">0</button>
        </div>
    );
};

export default Keyboard;