export function debaunce(cb: (...args: string[]) => void, delay: number = 250) {
    let timeOut: NodeJS.Timeout;
    return (...args: string[]) => {
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            cb(...args);
        }, delay);
    };
}