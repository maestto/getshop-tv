import React, {useState} from 'react';
import { motion } from 'framer-motion';

import './App.scss';
import MainBanner from "./components/MainBanner";
import PhoneBanner from "./components/PhoneBanner";

function App() {
    const [showMainBanner, setShowMainBanner] = useState(true);

    const toggleComponent = () => { setShowMainBanner((prev: boolean) => !prev) };

    return (
        <div className="App">
            <motion.div
                key={showMainBanner ? 'MainBanner' : 'PhoneBanner'}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.5 }}
                transition={{ duration: 0.5 }}
            >
                {showMainBanner ? <MainBanner toggleComponent={toggleComponent} /> : <PhoneBanner toggleComponent={toggleComponent} />}
            </motion.div>
        </div>
    );
}

export default App;
