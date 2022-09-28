export function capitalize(word: string) {
    return word
        .toLowerCase()
        .replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
}

export function fromPythonVarName(word: string) {
    return capitalize(word.replaceAll('_', ' '));
}