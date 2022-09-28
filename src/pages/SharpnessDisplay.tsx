export const sharpnessColors = new Map();
sharpnessColors.set("red", "#BE3843");
sharpnessColors.set("orange", "#D3673D");
sharpnessColors.set("yellow", "#C9B232");
sharpnessColors.set("green", "#81B034");
sharpnessColors.set("blue", "#3A58D7");
sharpnessColors.set("white", "#E2E2E2");
sharpnessColors.set("purple", "#885AEC");

export function formatSharpness (props: {
    startsMaxed: boolean,
    red: number,
    orange: number,
    yellow: number,
    green: number,
    blue: number,
    white: number,
    purple: number}): Array<JSX.Element>
    {
    let formatted: Array<JSX.Element> = [];
    sharpnessColors.forEach((value: string, key: string) => {
        formatted.push(<rect height="8" width={parseInt(props[key]) * 5} fill={value} x="64"></rect>);
    });
    //console.log(formatted);
    return formatted;
}

export function getSharpnessCode(colorName: string) {
    return sharpnessColors.get(colorName)
}