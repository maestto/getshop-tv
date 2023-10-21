import React, {RefObject, useEffect, useRef} from 'react';

import './MainBanner.scss';
import QRCode from "../media/qr-code.png"
import video from "../media/video.mp4"

function MainBanner() {
    const videoRef: RefObject<HTMLVideoElement> = useRef(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') console.log('Go to PhoneBanner')
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        <div className="mainBanner">
            <div className="mainBanner__background-video">
                <video ref={videoRef} autoPlay loop muted> {/* без muted автовоспроизведение не работает, пытался фиксить, но не понял как =( */}
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className="mainBanner__banner">
                <h1 className="mainBanner__banner__header">ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША!<br/>ПОДАРИТЕ ЕМУ СОБАКУ!</h1>
                <img className="mainBanner__banner__img" src={QRCode} alt="QR code"/>
                <h2 className="mainBanner__banner__subheader">Сканируйте QR-код или нажмите ОК</h2>
                <button className="mainBanner__banner__button" onClick={() => console.log('Go to PhoneBanner')}>ОК</button>
            </div>
        </div>
    );
}

export default MainBanner;
