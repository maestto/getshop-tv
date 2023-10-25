export const getCountryCodeLength = (phonePattern) => {
    return phonePattern.replace(/\D/g, '').length;
};

export const getPhoneLength = (phonePattern) => {
    return (phonePattern.match(/_/g) || []).length;
};

export const getOnlyNumbersFromPattern = (phonePattern) => {
    return phonePattern.replace(/\D/g, '');
};

export const getCountryCode = (phoneNumberWithCode, COUNTRY_CODE_LENGTH) => {
    let countryCode = phoneNumberWithCode.slice(0, COUNTRY_CODE_LENGTH);

    while (countryCode.length < COUNTRY_CODE_LENGTH) {
        countryCode += '_';
    }

    return countryCode;
};

export const getPhoneNumber = (
    phoneNumberWithCode,
    COUNTRY_CODE_LENGTH,
    PHONE_LENGTH
) => {
    let phoneNumber = phoneNumberWithCode.slice(COUNTRY_CODE_LENGTH);

    while (phoneNumber.length < PHONE_LENGTH) {
        phoneNumber += '_';
    }

    return phoneNumber;
};

export const validateForm = (phonePattern, phoneNumber, checkboxState) => {
    const PHONE_LENGTH = getPhoneLength(phonePattern);
    const COUNTRY_CODE_LENGTH = getCountryCodeLength(phonePattern);

    return (
        !!phoneNumber &&
        phoneNumber.length === COUNTRY_CODE_LENGTH + PHONE_LENGTH &&
        checkboxState
    );
};

export const validatePhoneNumber = async (phoneNumber) => {
    const accessKey = "464d965bfca9c07ee28f29dbc16c746b" // .env
    const response = await fetch(`http://apilayer.net/api/validate?number=${phoneNumber}&access_key=${accessKey}`);
    return await response.json();
}