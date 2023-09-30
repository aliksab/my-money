import { useDispatch, useSelector } from "react-redux";
import { chartDate } from "./displayDate"
import { getInvoiceManipulations } from "../store/invoiceManipulation";
import { getInvoices } from "../store/invoices";

// const dispatch = useDispatch()
// const manipulation = useSelector(getInvoiceManipulations())
// const invoice = useSelector(getInvoices())

export const lineOptions = {
    data: {
        labels: chartDate(),
        datasets: [
        {
            label: 'Organic',
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: '#0694a2',
            borderColor: '#0694a2',
            data: [43, 48, 40, 54, 67, 73, 70],
            fill: false,
        },
        {
            label: 'Paid',
            fill: false,
            /**
             * These colors come from Tailwind CSS palette
             * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
             */
            backgroundColor: '#7e3af2',
            borderColor: '#7e3af2',
            data: [24, 50, 64, 74, 52, 51, 65],
        },
        ],
    },
    options: {
        responsive: true,
        tooltips: {
        mode: 'index',
        intersect: false,
        },
        hover: {
        mode: 'nearest',
        intersect: true,
        },
        scales: {
        x: {
            display: true,
            scaleLabel: {
            display: true,
            labelString: 'day',
            },
        },
        y: {
            display: false,
            scaleLabel: {
            display: true,
            labelString: 'Value',
            },
        },
        },
    },
    legend: {
        display: false,
    },
}

export const barOptions = {
    data: {
      labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      datasets: [
        {
          label: 'Доходы',
          backgroundColor: '#0694a2',
          // borderColor: window.chartColors.red,
          borderWidth: 1,
          data: [-3, 14, 52, 74, 33, 90, 70],
        },
        {
          label: 'Расходы',
          backgroundColor: '#dc2626',
          // borderColor: window.chartColors.blue,
          borderWidth: 1,
          data: [66, 33, 43, 12, 54, 62, 84],
        },
      ],
    },
    options: {
      responsive: true,
    },
    legend: {
      display: false,
    },
  }