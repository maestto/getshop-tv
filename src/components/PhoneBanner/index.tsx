import React from 'react';

import "./index.scss"
import NavigationContainer from "./NavigationContainer";

type ComponentProps = { toggleComponent: () => void };

const PhoneBanner: React.FC<ComponentProps> = ({ toggleComponent }) => {

    return (
        <div>
            <NavigationContainer toggleComponent={toggleComponent}/>
        </div>
    );
};

export default PhoneBanner;