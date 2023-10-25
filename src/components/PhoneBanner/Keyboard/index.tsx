import React, {KeyboardEventHandler, MouseEventHandler} from 'react';

import NumPad from "../NumPad";

import "./index.scss"

const Keyboard = ({navigateClassName, onInput, onClear}: {navigateClassName: string, onInput: any, onClear: any}) => {

    const onButtonPress: MouseEventHandler<HTMLDivElement> = (event) => {
        const element = event.target as HTMLButtonElement
        if(element.type === 'button') onInput(Number(element.value));
    };

    const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        const key: string = event.key;
        if (key >= '0' && key <= '9') {
            onInput(Number(key));
        } else if (key === 'Backspace') {
            onClear();
        }
    };

    return (
        <div className="keyboard" onClick={onButtonPress} onKeyDown={onKeyDown}>
            <NumPad buttonClassName={navigateClassName}/>
            <div className="additional">
                <button id="clear" className={navigateClassName} type="reset">СТЕРЕТЬ</button>
                <button className={navigateClassName} value="0" type="button">0</button>
            </div>
        </div>
    );
};

export default Keyboard;