import { useEffect, useRef } from 'react';

const useTimer = (callback: () => void, duration: number) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            callback();
        }, duration);
    };

    const resetTimer = () => {
        if (timerRef.current !== null) {
            clearTimeout(timerRef.current);
        }
        startTimer();
    };

    useEffect(() => {
        startTimer();

        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, [callback, duration]);

    return { resetTimer };
};

export default useTimer;
