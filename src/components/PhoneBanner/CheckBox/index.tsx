import React from 'react';

import "./index.scss"

export default function CheckBox({ navigateClassName, onAgreeCheck }: {navigateClassName: string, onAgreeCheck: any}) {
    const onCheck = (event: any): void => {
        onAgreeCheck(event.target.checked);
    };
    const onCheckboxKeyDown = (event: any): void => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.checked = !event.target.checked;
            onAgreeCheck(event.target.checked);
        }
    };

    return (
        <label className='container'>Согласие на обработку<br/>персональных данных
            <input
                className={navigateClassName}
                onKeyDown={onCheckboxKeyDown}
                onChange={onCheck}
                type="checkbox"
            />
            <span className={`checkmark`}></span>
        </label>
    );
};