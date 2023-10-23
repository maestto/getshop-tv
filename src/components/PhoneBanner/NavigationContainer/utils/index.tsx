export const getButtonIndex = (allButtonsArray: NodeListOf<HTMLButtonElement>, currentButton: HTMLButtonElement) => {
    return Array.from(allButtonsArray).indexOf(currentButton);
};