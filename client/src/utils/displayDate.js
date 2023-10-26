export default function displayDate(data) {
    const date = new Date(data);
    // return (date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear())
    return date.toLocaleDateString("ru");
}

export function chartDate(optionDate) {
    const date = new Date();
    const dates = [];
    for (let i = 0; i < optionDate; i += 1) {
        dates.push(date.toLocaleDateString("ru"));
        date.setDate(date.getDate() - 1);
    }
    return dates.reverse();
}
