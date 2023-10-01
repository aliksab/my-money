import { Doughnut, Line, Bar } from "react-chartjs-2";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import InvoiceList from "../components/InvoiceList";
import RoundIcon from "../components/RoundIcon";
import { EditIcon, MoneyIcon } from '../icons'
import ChartCard from '../components/Chart/ChartCard'
import ChartLegend from '../components/Chart/ChartLegend'
import { lineOptions, barOptions, lineLegends, barLegends, dataChart, dateManipulation } from "../utils/chart.js"
import PageTitle from "../components/PageTitle";
import Charts from "../components/Chart";
import Modal from "../components/Modal";
import Invoices from "../components/Invoices";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import { useParams } from "react-router-dom";
import Modals from "../components/Modal";
import InvoiceForm from "../components/Forms/InvoiceForm";
import { getInvoices } from "../store/invoices";
import { chartDate } from "../utils/displayDate";
import Example from "../components/modalic";
import SelectField from "../components/SelectField";
import { useState } from "react";
import { getInvoiceManipulations } from "../store/invoiceManipulation";


const Home = () => {
    const [data, setData] = useState({ });

    const invoices = useSelector(getInvoices());
    const invoicesList = invoices.map((i) => ({label: i.name, value: i._id}))
    const oneInvoice = invoices.filter(i => i._id === data.invoiceId)
    const manipulation = useSelector(getInvoiceManipulations())
    const manipulationList = manipulation.filter(m => m.invoiceId === data.invoiceId)
    const allAmount = invoices.map(i => i.amount);
    const balance = allAmount.reduce((sum, x) => sum + x, 0)
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
        // console.log(dataChart(manipulationList));
        
    };
    return (
        <div className="flex">
            <div className="w-80">
                <div className="flex flex-col">
                    <InfoCard title="Общий баланс" value={`${balance.toLocaleString('ru')} ₽`}>
                        <RoundIcon
                            icon={MoneyIcon}
                            iconColorClass="text-green-500 dark:text-green-100"
                            bgColorClass="bg-green-100 dark:bg-green-500"
                            className="mr-4"
                        />
                    </InfoCard>

                    <Card>
                        <Modals title="Создать счёт"><InvoiceForm/></Modals>
                        <Example/>
                        <Invoices />
                    </Card>
                </div>
            </div>


            <div className="w-full flex content-around justify-around align-center h-fit">
            <ChartCard title={<SelectField label="График состояния счёта" name="invoiceId" options={invoicesList} onChange={handleChange} value={data.invoiceId} />}>

                <Line {...dateManipulation(manipulationList, oneInvoice)}/>
                {/* {console.log(dateManipulation(manipulationList, oneInvoice))} */}
            </ChartCard>
            </div>
        </div>
    );
}
 
export default Home;