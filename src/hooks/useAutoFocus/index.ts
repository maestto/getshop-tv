import React from 'react';

export function useAutoFocus(ref: React.MutableRefObject<HTMLElement | null>, selector: string): void {
    React.useEffect((): void => {
        ((ref?.current?.querySelector(`.${selector}`)) as HTMLElement).focus();
    });
}