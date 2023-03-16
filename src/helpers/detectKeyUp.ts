export const detectKeyUp = (
    handler: ( event?: KeyboardEvent ) => void,
    regex: RegExp
): void => {
    const handlerWithReset = (event: KeyboardEvent) => {
        if (!regex.test(event.key)) return;
        document.removeEventListener("keyup", handlerWithReset)
        handler(event);
    }
    document.addEventListener("keyup", handlerWithReset)
}