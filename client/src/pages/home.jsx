import { Line } from "react-chartjs-2";
import Card from "../components/Card";
import InfoCard from "../components/InfoCard";
import RoundIcon from "../components/RoundIcon";
import { MoneyIcon } from "../icons";
import ChartCard from "../components/Chart/ChartCard";
import { dateManipulation } from "../utils/chart.js";
import Invoices from "../components/Invoices";
import { useSelector } from "react-redux";
import InvoiceForm from "../components/Forms/InvoiceForm";
import { getInvoices } from "../store/invoices";
import SelectField from "../components/SelectField";
import { useState } from "react";
import { getInvoiceManipulations } from "../store/invoiceManipulation";
import MyModal from "../components/Modal";

const Home = () => {
    const [data, setData] = useState({});
    const invoices = useSelector(getInvoices());
    const invoicesList = invoices.map((i) => ({ label: i.name, value: i._id }));
    const oneInvoice = invoices.filter((i) => i._id === data.invoiceId);
    const optionDate = data.optionsData
    const manipulation = useSelector(getInvoiceManipulations());
    const manipulationList = manipulation.filter(
        (m) => m.invoiceId === data.invoiceId
    );
    const allAmount = invoices.map((i) => i.amount);
    const balance = allAmount.reduce((sum, x) => sum + x, 0);
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const optionDateArray = [
        {label: "7 дней", value: 7},
        {label: "30 дней", value: 30},
        {label: "90 дней", value: 90},
    ]
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-80 m-auto">
                <div className="flex flex-col">
                    <InfoCard
                        title="Общий баланс"
                        value={`${balance.toLocaleString("ru")} ₽`}
                    >
                        <RoundIcon
                            icon={MoneyIcon}
                            iconColorClass="text-green-500 dark:text-green-100"
                            bgColorClass="bg-green-100 dark:bg-green-500"
                            className="mr-4"
                        />
                    </InfoCard>

                    <Card>
                        <MyModal title="Создать счёт">
                            <InvoiceForm />
                        </MyModal>
                        <Invoices />
                    </Card>
                </div>
            </div>

            <div className="w-full flex content-around justify-around align-center h-fit">
                <ChartCard
                    title={
                        <div className="flex justify-between">
                            <div className="w-2/3">
                                <SelectField
                                label="График состояния счёта"
                                name="invoiceId"
                                options={invoicesList}
                                onChange={handleChange}
                                value={data.invoiceId}
                            />
                            </div>
                            
                            <div className="w-1/4">
                                <SelectField
                                label="Выберите период"
                                name="optionsData"
                                options={optionDateArray}
                                onChange={handleChange}
                                defaultOption={"Выберите период..."}
                                value={data.optionsData}
                            /> 
                            </div>
                            
                        </div>
                    }
                >
                    <Line {...dateManipulation(manipulationList, oneInvoice, optionDate)} />
                    {/* {console.log(dateManipulation(manipulationList, oneInvoice))} */}
                    
                    { console.log(invoicesList)}

                    
                </ChartCard>
            </div>
        </div>
    );
};

export default Home;
