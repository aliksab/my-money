export default function displayDate(data) {
    const date = new Date(data);
    if ( 0 <= date.getMonth()+1 < 9) return (date.getDate() + ".0" + (date.getMonth() + 1) + "." + date.getFullYear());
    return (date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear())
}

export function chartDate() {
    const date = new Date();
    const dates = [];
    for (let i = 0; i < 7; i += 1) {
    dates.push(date.toLocaleDateString('ru'));
    date.setDate(date.getDate() - 1);
    }
    return dates.reverse()
}