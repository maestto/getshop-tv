import React, { useEffect, useState } from 'react';

import './PhoneBanner.scss';
import { replaceCharacterInString } from "../utils/replaceCharacterInString";
import { DIRECT_TYPES, directAsIntByDirectType } from "../models/directionalTypes";

import QRCode from "../media/qr-code.png"
import checkbox from '../media/checkbox/checkbox.svg';
import checkboxChecked from '../media/checkbox/checkbox_checked.svg';
import closeButton from "../media/btn/close/close_btn.svg";
import closeButtonPoint from "../media/btn/close/close_btn_point.svg";

type ComponentProps = { toggleComponent: () => void };

const PhoneBanner: React.FC<ComponentProps> = ({ toggleComponent }) => {
    const [currentPosition, setCurrentPosition] = useState<number>(4);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("+7(___)___-__-__");
    const [isSubmitButtonAvailable, setIsSubmitButtonAvailable] = useState<boolean>(false);
    const [isFinalContent, setIsFinalContent] = useState<boolean>(true);

    enum NAVIGATION_POINT {
        ONE = 0,
        TWO = 1,
        THREE = 2,
        FOUR = 3,
        FIVE = 4,
        SIX = 5,
        SEVEN = 6,
        EIGHT = 7,
        NINE = 8,
        CLEAR = 9,
        ZERO = 10,
        CHECKBOX = 11,
        SUBMIT = 12,
        CLOSE = 13
    }

    const numberByNavigationPoint = {
        [NAVIGATION_POINT.ZERO]: "0",
        [NAVIGATION_POINT.ONE]: "1",
        [NAVIGATION_POINT.TWO]: "2",
        [NAVIGATION_POINT.THREE]: "3",
        [NAVIGATION_POINT.FOUR]: "4",
        [NAVIGATION_POINT.FIVE]: "5",
        [NAVIGATION_POINT.SIX]: "6",
        [NAVIGATION_POINT.SEVEN]: "7",
        [NAVIGATION_POINT.EIGHT]: "8",
        [NAVIGATION_POINT.NINE]: "9",

        [NAVIGATION_POINT.CLEAR]: "",
        [NAVIGATION_POINT.CHECKBOX]: "",
        [NAVIGATION_POINT.SUBMIT]: "",
        [NAVIGATION_POINT.CLOSE]: ""
    };


    const navigationMap: { [key: number]: NAVIGATION_POINT[] } = {
        // current position          UP                           DOWN                         LEFT                     RIGHT
        [NAVIGATION_POINT.ONE]:      [NAVIGATION_POINT.SUBMIT,    NAVIGATION_POINT.FOUR,       NAVIGATION_POINT.CLOSE,  NAVIGATION_POINT.TWO],
        [NAVIGATION_POINT.TWO]:      [NAVIGATION_POINT.SUBMIT,    NAVIGATION_POINT.FIVE,       NAVIGATION_POINT.ONE,    NAVIGATION_POINT.THREE],
        [NAVIGATION_POINT.THREE]:    [NAVIGATION_POINT.SUBMIT,    NAVIGATION_POINT.SIX,        NAVIGATION_POINT.TWO,    NAVIGATION_POINT.CLOSE],
        [NAVIGATION_POINT.FOUR]:     [NAVIGATION_POINT.ONE,       NAVIGATION_POINT.SEVEN,      NAVIGATION_POINT.CLOSE,  NAVIGATION_POINT.FIVE],
        [NAVIGATION_POINT.FIVE]:     [NAVIGATION_POINT.TWO,       NAVIGATION_POINT.EIGHT,      NAVIGATION_POINT.FOUR,   NAVIGATION_POINT.SIX],
        [NAVIGATION_POINT.SIX]:      [NAVIGATION_POINT.THREE,     NAVIGATION_POINT.NINE,       NAVIGATION_POINT.FIVE,   NAVIGATION_POINT.CLOSE],
        [NAVIGATION_POINT.SEVEN]:    [NAVIGATION_POINT.FOUR,      NAVIGATION_POINT.CLEAR,      NAVIGATION_POINT.CLOSE,  NAVIGATION_POINT.EIGHT],
        [NAVIGATION_POINT.EIGHT]:    [NAVIGATION_POINT.FIVE,      NAVIGATION_POINT.CLEAR,      NAVIGATION_POINT.SEVEN,  NAVIGATION_POINT.NINE],
        [NAVIGATION_POINT.NINE]:     [NAVIGATION_POINT.SIX,       NAVIGATION_POINT.ZERO,       NAVIGATION_POINT.EIGHT,  NAVIGATION_POINT.CLOSE],
        [NAVIGATION_POINT.CLEAR]:    [NAVIGATION_POINT.SEVEN,     NAVIGATION_POINT.CHECKBOX,   NAVIGATION_POINT.CLOSE,  NAVIGATION_POINT.ZERO],
        [NAVIGATION_POINT.ZERO]:     [NAVIGATION_POINT.NINE,      NAVIGATION_POINT.CHECKBOX,   NAVIGATION_POINT.CLEAR,  NAVIGATION_POINT.CLOSE],
        [NAVIGATION_POINT.CHECKBOX]: [NAVIGATION_POINT.CLEAR,     NAVIGATION_POINT.SUBMIT,     NAVIGATION_POINT.CLOSE,  NAVIGATION_POINT.CLOSE],
        [NAVIGATION_POINT.SUBMIT]:   [NAVIGATION_POINT.CHECKBOX,  NAVIGATION_POINT.ONE,        NAVIGATION_POINT.CLOSE,  NAVIGATION_POINT.CLOSE],
        [NAVIGATION_POINT.CLOSE]:    [NAVIGATION_POINT.FIVE,      NAVIGATION_POINT.FIVE,       NAVIGATION_POINT.FIVE,   NAVIGATION_POINT.FIVE],
    };

    const updatePositionByDirect = (direct: DIRECT_TYPES): void => {
        const directInt: number = directAsIntByDirectType[direct];

        setCurrentPosition(navigationMap[currentPosition][directInt]);
    };

    const KEY_PRESS = {
        DIGIT: /^[0-9]$/,
        ENTER: 'Enter',
        BACKSPACE: 'Backspace',
        ARROW_KEYS: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
    };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent): void => {
            if(isSubmitButtonAvailable) setIsSubmitButtonAvailable(false);
            if(phoneNumber.indexOf("_") === -1 && isCheckboxChecked) setIsSubmitButtonAvailable(true);
            if (KEY_PRESS.DIGIT.test(event.key)) addNumberToPhoneNumber(event.key);
            else if (event.key === KEY_PRESS.ENTER) {
                switch(currentPosition) {
                    case NAVIGATION_POINT.CLEAR: {
                        return removeLastNumberFromPhoneNumber();
                    }
                    case NAVIGATION_POINT.CHECKBOX: {
                        return setIsCheckboxChecked(!isCheckboxChecked);
                    }
                    case NAVIGATION_POINT.SUBMIT: {
                        if(isSubmitButtonAvailable) setIsFinalContent(true);
                        return;
                    }
                    case NAVIGATION_POINT.CLOSE: {
                        return toggleComponent();
                    }
                }

                if (currentPosition in numberByNavigationPoint) addNumberToPhoneNumber(numberByNavigationPoint[currentPosition as NAVIGATION_POINT]);
            }
            else if (event.key === KEY_PRESS.BACKSPACE) removeLastNumberFromPhoneNumber();
            else if (KEY_PRESS.ARROW_KEYS.includes(event.key)) updatePositionByDirect(event.key as DIRECT_TYPES);
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [phoneNumber, currentPosition, isCheckboxChecked]);

    const addNumberToPhoneNumber = (number: string): void => {
        const index: number = phoneNumber.indexOf("_");
        if (index !== -1) setPhoneNumber(replaceCharacterInString(phoneNumber, index, number));
    };

    const removeLastNumberFromPhoneNumber = (): void => {
        let index: number = phoneNumber.indexOf("_") === -1 ? phoneNumber.length : phoneNumber.indexOf("_");
        switch (phoneNumber[index - 1]) {
            case "(": return;
            case ")" : case "-": index = index - 1;
        }
        setPhoneNumber(replaceCharacterInString(phoneNumber, index - 1, "_"));
    };

    const keyboardButtons: string[] = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        'СТЕРЕТЬ', '0'
    ];

    return (
        <div className="phoneBanner">
            {
                !isFinalContent
                    ?
                (
                <div className="phoneBanner__main">
                    <h1 className="phoneBanner__main__header">Введите ваш номер мобильного телефона</h1>
                    <p className="phoneBanner__main__phone">{phoneNumber}</p>
                    <h2 className="phoneBanner__main__subheader">и с Вами свяжется наш менеждер для<br/>дальнейшей консультации</h2>
                    <div className="phoneBanner__main__container">
                        <div className="phoneBanner__main__container__keyboard">
                            {
                                keyboardButtons.map((buttonLabel: string, index: number) => (
                                    <button
                                        key = {index}
                                        className = {`${buttonLabel === 'СТЕРЕТЬ' ? 'key clear' : 'key'} ${currentPosition === index ? 'point' : ''}`}
                                        onClick = {(): void => {
                                            if (buttonLabel === 'СТЕРЕТЬ') removeLastNumberFromPhoneNumber();
                                            else addNumberToPhoneNumber(buttonLabel);
                                        }}
                                        tabIndex={-1}
                                    >
                                        {buttonLabel}
                                    </button>
                                ))}
                        </div>
                        <label className="phoneBanner__main__container__checkboxLabel" onClick={() => setIsCheckboxChecked(!isCheckboxChecked)}>
                            <div className={`phoneBanner__main__container__checkboxLabel__checkbox ${isCheckboxChecked ? 'checked' : ''}`}>
                                <img
                                    className = {`phoneBanner__main__container__checkboxLabel__img__${currentPosition === NAVIGATION_POINT.CHECKBOX ? "point" : ""}`}
                                    src = {isCheckboxChecked ? checkboxChecked : checkbox}
                                    alt = "Checkbox"
                                />
                            </div>
                            Согласие на обработку<br/>персональных данных
                        </label>
                        <button
                            className={`phoneBanner__main__container__submitButton${currentPosition === NAVIGATION_POINT.SUBMIT ? isSubmitButtonAvailable ? "__pointA" : "__point" : ""}`}
                            tabIndex={-1}
                        >
                            ПОДТВЕРДИТЬ НОМЕР
                        </button>
                    </div>
                </div>)
                    :
                    (<div className="phoneBanner__final">
                        <div className="phoneBanner__final__container">
                            <h1 className="phoneBanner__final__container__header">ЗАЯВКА<br/>ПРИНЯТА</h1>
                            <h2 className="phoneBanner__final__container__subheader">Держите телефон под рукой.<br/>Скоро с Вами свяжется наш менеджер.</h2>
                        </div>
                    </div>)
            }
            <div className="phoneBanner__leftSide">
                <img
                    className="phoneBanner__leftSide__closeButton"
                    src={currentPosition === NAVIGATION_POINT.CLOSE ? closeButtonPoint : closeButton}
                    alt={"Close button"}
                    onClick={() => toggleComponent()}
                />
                <div className="phoneBanner__leftSide__QR-Code">
                    <p className="phoneBanner__leftSide__QR-Code__text">Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
                    <img className="phoneBanner__leftSide__QR-Code__img" src={QRCode} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default PhoneBanner;
