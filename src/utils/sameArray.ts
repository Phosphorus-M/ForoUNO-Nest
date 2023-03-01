
export function isTheSameArray(array1, array2, attribute): boolean {
    if (array1.length !== array2.length) { return false; }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i][attribute] !== array2[i]) { return false; }
    }
    return true;
}
