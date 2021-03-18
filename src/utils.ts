export const fff:number = 0;

export const cutWords = (text: string, length: number) : string => {
    if(text.length <= length) return text;
    return `${text.substr(0, length - 3)}...`;
}