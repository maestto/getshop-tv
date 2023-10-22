import React, {RefObject, useEffect, useRef, useState} from 'react';
import { motion } from 'framer-motion';

import './MainBanner.scss';
import QRCode from "../media/qr-code.png"
import video from "../media/video.mp4"

type ComponentProps = { toggleComponent: () => void };

const MainBanner: React.FC<ComponentProps> = ({ toggleComponent }) => {
    const videoRef: RefObject<HTMLVideoElement> = useRef(null);

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
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
                if(isVisible) toggleComponent();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isVisible]);

    return (
        <div className="mainBanner">
            <div className="mainBanner__background-video">
                <video ref={videoRef} autoPlay loop muted> {/* без muted автовоспроизведение не работает, пытался фиксить, но не понял как =( */}
                    <source src={video} type="video/mp4" />
                </video>
                {/*<h1>{videoRef.current?.currentTime}</h1>*/}
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                {isVisible && (
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
