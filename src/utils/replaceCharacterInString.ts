export function replaceCharacterInString(string: string, index: number, char: string): string {
    const stringStart: string = string.substring(0, index);
    const stringEnd: string = string.substring(index + 1);
    return stringStart + char + stringEnd;
}