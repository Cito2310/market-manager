export const detectKeyUp = (
    handler: ( event?: KeyboardEvent ) => void,
    regex: RegExp
) => {
    const handlerWithReset = (event: KeyboardEvent) => {
        document.removeEventListener("keyup", handlerWithReset)
        if (!regex.test(event.key)) return;
        handler(event);
    }

    document.addEventListener("keyup", handlerWithReset)
}