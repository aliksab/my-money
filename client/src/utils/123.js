export function dataChart(manipulation) {
    const dateManipulate = new Date().toLocaleDateString("ru");
    const arrDate = chartDate();
    const manList = [];
    let amount;
    for (let i = 0; i < arrDate.length; i++) {
        manipulation.map((m) => {
            if (new Date(m.createdAt).toLocaleDateString("ru") === arrDate[i]) {
                if (m.type === "profit") {
                    amount += m.amount;
                    manList.push({ date: arrDate[i], amount: amount });
                } else {
                    amount -= m.amount;
                    manList.push({ date: arrDate[i], amount: amount });
                }
                // manList.push({date: arrDate[i], amount: m.amount, type: m.type})
            }
        });
    }
    // return manList

    let lineOptions = {};
    return (lineOptions = {
        data: {
            labels: manList.map((d) => d.date),
            datasets: [
                {
                    label: "Organic",
                    /**
                     * These colors come from Tailwind CSS palette
                     * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
                     */
                    backgroundColor: "#0694a2",
                    borderColor: "#0694a2",
                    data: manList.map((a) => a.amount),
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
                    display: false,
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
