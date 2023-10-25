import React from 'react';

import {
    getCountryCodeLength,
    getPhoneLength,
    getCountryCode,
    getPhoneNumber,
    getOnlyNumbersFromPattern,
    validateForm,
} from '../utils';

const usePhoneInputState = (phonePattern: any) => {
    const PHONE_LENGTH = getPhoneLength(phonePattern);
    const COUNTRY_CODE_LENGTH = getCountryCodeLength(phonePattern);

    const [value, setValue] = React.useState(phonePattern);
    const [rawValue, setRawValue] = React.useState(
        getOnlyNumbersFromPattern(phonePattern)
    );

    const updatePhoneNumber = (newValue: any) => {
        if (
            newValue !== null &&
            newValue.length <= COUNTRY_CODE_LENGTH + PHONE_LENGTH
        ) {
            const countryCode = getCountryCode(newValue, COUNTRY_CODE_LENGTH);
            const phoneNumber = getPhoneNumber(
                newValue,
                COUNTRY_CODE_LENGTH,
                PHONE_LENGTH
            );

            const formattedPhoneNumber = `+${countryCode}(${phoneNumber.slice(0, 3)})${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8)}`;
            setValue(formattedPhoneNumber);
            setRawValue(newValue);
        }
    };

    return [rawValue, value, updatePhoneNumber];
};

export const usePhoneNumberForm = (phonePattern: any) => {
    const [checkboxState, setCheckboxState] = React.useState(false);
    const [rawPhoneNumber, formattedPhoneNumber, updatePhoneNumber] = usePhoneInputState(phonePattern);

    const isFormValid = React.useMemo(
        () => validateForm(phonePattern, rawPhoneNumber, checkboxState),
        [phonePattern, rawPhoneNumber, checkboxState]
    );

    return [
        rawPhoneNumber,
        formattedPhoneNumber,
        updatePhoneNumber,
        setCheckboxState,
        isFormValid,
    ];
};
