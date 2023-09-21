import { Doughnut, Line, Bar } from "react-chartjs-2";
import Button from "../components/Button";
import Card from "../components/Card";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import InvoiceList from "../components/InvoiceList";
import RoundIcon from "../components/RoundIcon";
import { MoneyIcon } from '../icons'
import ChartCard from '../components/Chart/ChartCard'
import ChartLegend from '../components/Chart/ChartLegend'
import { lineOptions, barOptions, lineLegends, barLegends } from "../utils/chart.js"
import PageTitle from "../components/PageTitle";
import Charts from "../components/Chart";
import Modals from "../components/Modals";

const Home = () => {
    
    const toggleButtonInvoice = () => {
        alert('123')
    }
    return (
        <div className="flex">
            <div className="w-80">
                <div className="flex flex-col">
                    <InfoCard title="Account balance" value="$ 46,760.89">
                        <RoundIcon
                            icon={MoneyIcon}
                            iconColorClass="text-green-500 dark:text-green-100"
                            bgColorClass="bg-green-100 dark:bg-green-500"
                            className="mr-4"
                        />
                    </InfoCard>

                    <Card>
                        <Modals />
                        <Button toggleButton={toggleButtonInvoice}>Новый счёт</Button>
                        <InvoiceList/>
                    </Card>
                </div>
            </div>

            {/* <ChartCard title="Lines">
                <Line {...lineOptions} />
                <ChartLegend legends={lineLegends} />
            </ChartCard> */}
            <div className="w-full flex content-around justify-around align-center h-fit">
                <ChartCard title="Диаграма состояния счёта">
                    <Bar {...barOptions} />
                    {/* <ChartLegend legends={barLegends} /> */}
                </ChartCard>
            </div>

            


        </div>
        
    );
}
 
export default Home;