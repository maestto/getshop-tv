import React, {RefObject, useEffect, useRef, useState} from 'react';
import { motion } from 'framer-motion';

import './index.scss';
import QRCode from "../../media/qr-code.png"
import video from "./media/video.mp4"

type ComponentProps = { toggleComponent: () => void };

const MainBanner: React.FC<ComponentProps> = ({ toggleComponent }) => {
    const videoRef: RefObject<HTMLVideoElement> = useRef(null);

    const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsBannerVisible(true);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    // const toggleVideo = (): void => {
    //     const video = videoRef.current;
    //     // if (video) {
    //     //     if (video.paused) video.play();
    //     //     else video.pause();
    //     // }
    // };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Enter') {
                if(isBannerVisible) toggleComponent();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isBannerVisible]);

    return (
        <div className="mainBanner">
            <div className="mainBanner__background-video">
                <video ref={videoRef} autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
                {/*<h1>{videoRef.current?.currentTime}</h1>*/}
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: isBannerVisible ? 1 : 0 }} transition={{ duration: 0.5 }}>
                {isBannerVisible && (
                    <div className="mainBanner__banner">
                        <h1 className="mainBanner__banner__header">ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!<br/>ПОДАРИТЕ ЕМУ СОБАКУ!</h1>
                        <img className="mainBanner__banner__img" src={QRCode} alt="QR code"/>
                        <h2 className="mainBanner__banner__subheader">Сканируйте QR-код или нажмите ОК</h2>
                        <button className="mainBanner__banner__button" onClick={() => toggleComponent()}>ОК</button>
                    </div>
                )}
            </motion.div>
            );
        </div>
    );
}

export default MainBanner;
