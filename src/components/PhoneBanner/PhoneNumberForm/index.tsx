import React, {FormEventHandler} from 'react';
import Keyboard from "../Keyboard";
import {usePhoneNumberForm} from "./hooks/usePhoneNumberForm";
import CheckBox from "../CheckBox";

import "./index.scss"
import {validatePhoneNumber} from "./utils";

const PhoneNumberForm = ({navigateClassName, phonePattern, setIsFormAccepted, isNumberCorrect, setIsNumberCorrect}: {navigateClassName: string, phonePattern: string, setIsFormAccepted: any, isNumberCorrect: boolean, setIsNumberCorrect: any}) => {
    const [
        rawPhoneNumber,
        formattedPhoneNumber,
        updatePhoneNumber,
        setCheckboxState,
        isFormValid
    ] = usePhoneNumberForm(phonePattern);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event): Promise<void> => {
        event.preventDefault();
        event.stopPropagation();

        // setFetching(true);

        try {
            const data = await validatePhoneNumber(rawPhoneNumber);

            if (data.valid) {
                setIsFormAccepted(true);
            } else {
                setIsNumberCorrect(false);
            }
            console.log(data)
        } catch (error) {
            console.error("Ошибка при валидации номера", error);
        } finally {
            // setFetching(false);
        }
    };

    const onClear = (event: any): void => {
        event?.preventDefault();

        if(!isNumberCorrect) {
            setIsNumberCorrect(true);
        }

        updatePhoneNumber(rawPhoneNumber.slice(0, rawPhoneNumber.length - 1));
    };

    const onInput = (newCharacter: string): void => {
        updatePhoneNumber(rawPhoneNumber + newCharacter);
    };

    return (
        <form className="form" onReset={onClear} onSubmit={onSubmit}>
            <h2>Введите ваш номер<br/>мобильного телефона</h2>
            <h1 className={isNumberCorrect ? "" : "err"}>{formattedPhoneNumber}</h1>
            <h3>и с Вами свяжется наш менеждер для<br/>дальнейшей консультации</h3>
            <div className="keyboard__container">
                <Keyboard navigateClassName={navigateClassName} onInput={onInput} onClear={onClear}/>
                <div className="checkbox__container">
                    {
                        isNumberCorrect ?
                        (<CheckBox navigateClassName={navigateClassName} onAgreeCheck={setCheckboxState}/>)
                        :
                        (<h4 className="err">НЕВЕРНО ВВЕДЁН НОМЕР</h4>)
                    }
                </div>
                <button className={navigateClassName} type="submit" disabled={!isFormValid}>Подтвердить номер</button>
            </div>
        </form>
    );
};

export default PhoneNumberForm;