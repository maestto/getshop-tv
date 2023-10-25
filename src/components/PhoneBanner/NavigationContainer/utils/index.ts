export const getElementIndex = (allElementsArray: NodeListOf<HTMLElement>, currentElement: HTMLElement) => {
    return Array.from(allElementsArray).indexOf(currentElement);
};

export const goToNextElement = (allElementsArray: NodeListOf<HTMLElement>, elementIndex: number): void => {
    const firstElement: HTMLElement = allElementsArray[0];
    const nextElement: HTMLElement = allElementsArray[elementIndex + 1];

    if(nextElement) {
        const nextElementAttributes: NamedNodeMap = nextElement.attributes;
        const isDisabled: Attr | null = nextElementAttributes.getNamedItem('disabled');

        if(!isDisabled) {
            nextElement.focus();
        } else {
            goToNextElement(allElementsArray, elementIndex + 1);
        }
    } else {
        firstElement?.focus();
    }
}

export const goToPrevElement = (allElementsArray: NodeListOf<HTMLElement>, elementIndex: number): void => {
    const lastElement: HTMLElement = allElementsArray[allElementsArray.length - 1];
    const prevElement: HTMLElement = allElementsArray[elementIndex - 1];

    if(prevElement) {
        const nextElementAttributes = prevElement.attributes;
        const isDisabled: Attr | null = nextElementAttributes.getNamedItem('disabled');

        if(!isDisabled) {
            prevElement.focus();
        } else {
            goToPrevElement(allElementsArray, elementIndex - 1);
        }
    } else {
        lastElement?.focus();
    }
}