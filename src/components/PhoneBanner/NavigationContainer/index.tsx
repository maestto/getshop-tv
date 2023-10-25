import React, {KeyboardEventHandler, MouseEventHandler} from 'react';

import {getElementIndex, goToNextElement, goToPrevElement} from "./utils";
import {useAutoFocus} from "../../../hooks/useAutoFocus";
import PhoneNumberForm from "../PhoneNumberForm";

import QRCode from "../../../media/qr-code.png"

import "./index.scss"
import useTimer from "../../../hooks/useTimer";

type ComponentProps = { toggleComponent: () => void };

const NavigationContainer: React.FC<ComponentProps> = ({ toggleComponent }) => {
    const [isFormAccepted, setIsFormAccepted] = React.useState<boolean>(false);
    const [isNumberCorrect, setIsNumberCorrect] = React.useState<boolean>(true);

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const navigateClassName: string = "navigatePoint";

    useAutoFocus(containerRef, navigateClassName);
    const { resetTimer } = useTimer(toggleComponent, 10000);

    const onClick: MouseEventHandler<HTMLDivElement>  = (event): void => {
        const { target: currentElement, currentTarget: container } = event;

        if(!(currentElement as HTMLElement).classList.contains(navigateClassName)) {
            const allElementsArray = container.querySelectorAll<HTMLElement>(`.${navigateClassName}`);
            const firstElement: HTMLElement = allElementsArray[0];

            firstElement?.focus();
        }

        resetTimer();
    }

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event): void => {
        const { target: currentElement, currentTarget: container, key } = event;

        const allElementsArray = container.querySelectorAll<HTMLElement>(`.${navigateClassName}`);
        console.log(allElementsArray);
        const elementIndex: number = getElementIndex(allElementsArray, currentElement as HTMLElement);

        switch (key) {
            case 'ArrowRight': {
                goToNextElement(allElementsArray, elementIndex);
                break;
            }
            case 'ArrowLeft': {
                goToPrevElement(allElementsArray, elementIndex);
                break;
            }
        }

        resetTimer();
    };

    const onCloseButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event): void => {
        if(event.key === 'Enter') {
            onPressClose();
        }
    };

    const onPressClose = (): void => {
        return toggleComponent();
    };

    return (
        <div className="navigationContainer" ref={containerRef} onKeyDown={onKeyDown} onClick={onClick}>
            <div className="navigationContainer__form">
                {!isFormAccepted ? (
                    <PhoneNumberForm
                        phonePattern={"+7(___)___-__-__"}
                        navigateClassName={navigateClassName}
                        setIsFormAccepted={setIsFormAccepted}
                        isNumberCorrect={isNumberCorrect}
                        setIsNumberCorrect={setIsNumberCorrect}
                    />
                ) : (
                    <div className="formAccepted">
                        <h1>ЗАЯВКА<br/>ПРИНЯТА</h1>
                        <h3>Держите телефон под рукой.<br/>Скоро с Вами свяжется наш менеджер. </h3>
                    </div>
                )}
            </div>
            <div className="navigationContainer__additional">
                <button className={navigateClassName} type="button" value="close" onKeyDown={onCloseButtonKeyDown} onClick={onPressClose}>
                    <svg width="88" height="52" viewBox="0 0 88 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line id="Line 1" x1="34.3448" y1="14.9407" x2="54.6264" y2="35.2223" stroke="black" strokeWidth="3"/>
                        <line id="Line 2" x1="33.6576" y1="35.2223" x2="53.9392" y2="14.9407" stroke="black" strokeWidth="3"/>
                    </svg>
                </button>
                <div className="navigationContainer__additional__QR-code">
                    <p>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
                    <img src={QRCode} alt="QR code"/>
                </div>
            </div>
        </div>
    );
};

export default NavigationContainer;