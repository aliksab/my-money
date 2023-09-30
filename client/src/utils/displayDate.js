export default function displayDate(data) {
    const date = new Date(data);
    // const dateNow = new Date();
    // const yearDif = dateNow.getFullYear() - date.getFullYear();
    // if (yearDif === 0) {
    //     const dayDif = dateNow.getDay() - date.getDay();
    //     if (dayDif === 0) {
    //         const hourDif = dateNow.getHours() - date.getHours();
    //         if (hourDif === 0) {
    //             const minuteDif = dateNow.getMinutes() - date.getMinutes();
    //             if (minuteDif >= 0 && minuteDif < 5) return "1 минуту назад";
    //             if (minuteDif >= 5 && minuteDif < 10) return "5 минут назад";
    //             if (minuteDif >= 10 && minuteDif < 30) {
    //                 return "10 минут назад";
    //             } return "30 минут назад";
    //         }
    //         return `${date.getHours()}:${date.getMinutes()}`;
    //     }
    //     return `${date.getDay()} ${date.toLocaleString("default", { month: "long" })}`;
    // }
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