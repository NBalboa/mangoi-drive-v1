export function toStringTitle(text) {
    const firstLetter = text.charAt(0).toUpperCase();
    const theRestLetter = text.slice(1);

    if (text.length > 1) {
        return firstLetter + theRestLetter;
    } else {
        return firstLetter;
    }
}
