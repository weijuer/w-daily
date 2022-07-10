export function getDay(day) {
    const today = new Date();
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds);
    const tYear = today.getFullYear();
    const tMonth = today.getMonth();
    const tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}

export function getDayTime(day) {
    const today = new Date();
    const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds);
    return today.getTime();
}

function doHandleMonth(month) {
    let m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}