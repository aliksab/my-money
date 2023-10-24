import { chartDate } from "./displayDate";

export function dateManipulation(manipulation, invoice) {
    const dateManipulate = new Date().toLocaleDateString("ru");
    const arrDate = chartDate();
    let amount = Number(invoice.map((i) => i.amount));
    const manList = [];
    const arrChart = [];
    for (let i = 0; i < arrDate.length; i++) {
        manipulation.map((m) => {
            if (new Date(m.createdAt).toLocaleDateString("ru") === arrDate[i]) {
                manList.push({
                    date: arrDate[i],
                    amount: m.amount,
                    type: m.type
                });
            }
        });
    }

    for (let i = arrDate.length; i > 0; i--) {
        manList.filter((oper) => {
            if (oper.date === arrDate[i]) {
                if (oper.type === "profit") {
                    amount -= oper.amount;
                } else {
                    amount += oper.amount;
                }
            }
        });
        arrChart.push({ date: arrDate[i - 1], data: amount });
    }

    let lineOptions = {};
    return (lineOptions = {
        data: {
            labels: arrChart.reverse().map((d) => d.date),
            datasets: [
                {
                    label: "Скрыть линию",
                    /**
                     * These colors come from Tailwind CSS palette
                     * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
                     */
                    backgroundColor: "#0694a2",
                    borderColor: "#0694a2",
                    data: arrChart.map((a) => a.data),
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: "index",
                intersect: false
            },
            hover: {
                mode: "nearest",
                intersect: true
            },
            scales: {
                x: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "day"
                    }
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Value"
                    }
                }
            }
        },
        legend: {
            display: false
        }
    });
}

export const barOptions = {
    data: {
        labels: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        datasets: [
            {
                label: "Доходы",
                backgroundColor: "#0694a2",
                // borderColor: window.chartColors.red,
                borderWidth: 1,
                data: [-3, 14, 52, 74, 33, 90, 70]
            },
            {
                label: "Расходы",
                backgroundColor: "#dc2626",
                // borderColor: window.chartColors.blue,
                borderWidth: 1,
                data: [66, 33, 43, 12, 54, 62, 84]
            }
        ]
    },
    options: {
        responsive: true
    },
    legend: {
        display: false
    }
};
