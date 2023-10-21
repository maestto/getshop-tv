export enum DIRECT_TYPES {
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
}

export const directAsIntByDirectType = {
    [DIRECT_TYPES.UP]: 0,
    [DIRECT_TYPES.DOWN]: 1,
    [DIRECT_TYPES.LEFT]: 2,
    [DIRECT_TYPES.RIGHT]: 3,
};