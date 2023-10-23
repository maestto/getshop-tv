import React, {KeyboardEventHandler, MouseEventHandler, useRef} from 'react';

import Keyboard from "../Keyboard";
import {getButtonIndex} from "./utils";
import {useAutoFocus} from "../../../hooks/useAutoFocus";

const NavigationContainer = () => {
    const containerRef: React.MutableRefObject<null> = useRef(null);

    const buttonClassName: string = "btn"

    useAutoFocus(containerRef, buttonClassName)

    const onClick: MouseEventHandler<HTMLFormElement>  = (event): void => {
        const { target: currentElement, currentTarget: container } = event;

        if(!(currentElement as HTMLElement).classList.contains(buttonClassName)) {
            const allButtonsArray = container.querySelectorAll<HTMLButtonElement>(`.${buttonClassName}`);
            const firstElement: HTMLButtonElement = allButtonsArray[0];

            firstElement?.focus();
        }
    }

    const onKeyDown: KeyboardEventHandler<HTMLFormElement> = (event): void => {
        const { target: currentButton, currentTarget: container, key } = event;

        const allButtonsArray = container.querySelectorAll<HTMLButtonElement>(`.${buttonClassName}`);
        const buttonIndex: number = getButtonIndex(allButtonsArray, currentButton as HTMLButtonElement);

        switch (key) {
            case 'Enter': {
                console.log((currentButton as HTMLButtonElement).value);
                break;
            }
            case 'ArrowRight': {
                const firstElement: HTMLButtonElement = allButtonsArray[0];
                const nextElement: HTMLButtonElement = allButtonsArray[buttonIndex + 1];

                if(nextElement) {
                    nextElement?.focus();
                } else {
                    firstElement?.focus();
                }
                break;
            }
            case 'ArrowLeft': {
                const lastElement: HTMLButtonElement = allButtonsArray[allButtonsArray.length - 1];
                const prevElement: HTMLButtonElement = allButtonsArray[buttonIndex - 1];

                if(prevElement) {
                    prevElement?.focus();
                } else {
                    lastElement?.focus();
                }
                break;
            }
        }
    };

    const onSubmit = (event: any): void => {
        event.preventDefault();
        console.log(event)
    }

    const onReset = (event: any): void => {
        console.log(event)
    }

    return (
        <form className="NavigationContainer" ref={containerRef} onKeyDown={onKeyDown} onClick={onClick} onSubmit={onSubmit} onReset={onReset}>
            <Keyboard buttonClassName={buttonClassName}/>
            <input type="checkbox" value="checkbox" className={buttonClassName}/>
            <button className={buttonClassName} type="submit">Save</button>
            <button className={buttonClassName} type="reset">X</button>
        </form>
    );
};

export default NavigationContainer;