import React, {useEffect, useState} from 'react';

import './PhoneBanner.scss';
import {replaceCharacterInString} from "../utils/replaceCharacterInString";
import {DIRECT_TYPES, directAsIntByDirectType} from "../models/directionalTypes";
import {
    NAVIGATION_POINT,
    navigationMap,
    navigationPointByNumber,
    numberByNavigationPoint
} from "../models/navigationTypes";

import QRCode from "../media/qr-code.png"
import checkbox from '../media/checkbox/checkbox.svg';
import checkboxChecked from '../media/checkbox/checkbox_checked.svg';
import closeButton from "../media/btn/close/close_btn.svg";
import closeButtonPoint from "../media/btn/close/close_btn_point.svg";

type ComponentProps = { toggleComponent: () => void };

const PhoneBanner: React.FC<ComponentProps> = ({ toggleComponent }) => {
    const [currentPosition, setCurrentPosition] = useState<NAVIGATION_POINT>(NAVIGATION_POINT.FIVE);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("+7(___)___-__-__");
    const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState<boolean>(false);
    const [isFinalContent, setIsFinalContent] = useState<boolean>(false);

    // useReduce

    const updatePositionByDirect = (direct: DIRECT_TYPES): void => {
        const directInt: number = directAsIntByDirectType[direct];

        setCurrentPosition(navigationMap[currentPosition][directInt]);
    };

    const KEY = {
        DIGIT: /^[0-9]$/,
        ENTER: 'Enter',
        BACKSPACE: 'Backspace',
        ARROW_KEYS: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
    };

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

    useEffect(() => {
        if(isCheckboxChecked && phoneNumber.indexOf("_") === -1) setIsSubmitButtonEnabled(true);
        else setIsSubmitButtonEnabled(false);

        const onKeyDown = (event: KeyboardEvent): void => {
            if (KEY.DIGIT.test(event.key)) {
                setCurrentPosition(navigationPointByNumber[event.key]);
                addNumberToPhoneNumber(event.key);
            } else if (event.key === KEY.ENTER) {
                switch(currentPosition) {
                    case NAVIGATION_POINT.CLEAR: {
                        removeLastNumberFromPhoneNumber();
                        break;
                    }
                    case NAVIGATION_POINT.CHECKBOX: {
                        setIsCheckboxChecked(!isCheckboxChecked);
                        break;
                    }
                    case NAVIGATION_POINT.SUBMIT: {
                        if(isSubmitButtonEnabled) {
                            setIsFinalContent(true);
                            setCurrentPosition(NAVIGATION_POINT.CLOSE);
                        }
                        break;
                    }
                    case NAVIGATION_POINT.CLOSE: {
                        toggleComponent();
                        break;
                    }
                    default: {
                        addNumberToPhoneNumber(numberByNavigationPoint[currentPosition as NAVIGATION_POINT]);
                    }
                }
            } else if (event.key === KEY.BACKSPACE) {
                setCurrentPosition(NAVIGATION_POINT.CLEAR);
                removeLastNumberFromPhoneNumber();
            } else if (KEY.ARROW_KEYS.includes(event.key)) {
                if(!isFinalContent) updatePositionByDirect(event.key as DIRECT_TYPES);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [phoneNumber, currentPosition, isCheckboxChecked, isSubmitButtonEnabled]);

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
                                            setCurrentPosition(index);
                                        }}
                                        tabIndex={-1}
                                    >
                                        {buttonLabel}
                                    </button>
                                ))}
                        </div>
                        <label
                            className="phoneBanner__main__container__checkboxLabel"
                            onClick={() => {
                                setCurrentPosition(NAVIGATION_POINT.CHECKBOX);
                                setIsCheckboxChecked(!isCheckboxChecked);
                            }}
                        >
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
                            className={`phoneBanner__main__container__submitButton ${isSubmitButtonEnabled ? "buttonEnabled" : "buttonDisabled"}${currentPosition === NAVIGATION_POINT.SUBMIT ? "__point" : ""}`}
                            tabIndex={-1}
                            onClick={(): void => {
                                setCurrentPosition(NAVIGATION_POINT.SUBMIT)
                                setIsFinalContent(true);
                                setCurrentPosition(NAVIGATION_POINT.CLOSE);
                            }}
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
                    onClick={(): void => {
                        setCurrentPosition(NAVIGATION_POINT.CLOSE);
                        toggleComponent();
                    }}
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
