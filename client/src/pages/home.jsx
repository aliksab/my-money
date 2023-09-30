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
import { lineOptions, barOptions, lineLegends, barLegends } from "../utils/chart.js"
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


const Home = () => {
    const invoices = useSelector(getInvoices());
    const allAmount = invoices.map(i => i.amount);
    const balance = allAmount.reduce((sum, x) => sum + x, 0)
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
                {console.log(chartDate())}
            <ChartCard title="Lines">
                <Line {...lineOptions} />
            </ChartCard>
            </div>
        </div>
    );
}
 
export default Home;