export function themeChange(body, setObjectTheme) {
    const keyArr = Object.keys(setObjectTheme);
    const value = Object.values(setObjectTheme);

    for (let i = 0; i < keyArr.length; i++){
        body.style.setProperty(keyArr[i], value[i]);
    }
}