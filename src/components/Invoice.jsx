import { ChatIcon } from "../icons";
import InfoCard from "./InfoCard";
import RoundIcon from "./RoundIcon";

const Invoice = ({ name, amount }) => {
    return (
        <div className="w-full my-2 rounded bg-gray relative">
            {/* <h4>{name}</h4>
            <span>{amount}</span> */}
            <InfoCard title={name} value={amount}>
                <RoundIcon
                    icon={ChatIcon}
                    iconColorClass="text-teal-500 dark:text-teal-100"
                    bgColorClass="bg-teal-100 dark:bg-teal-500"
                    className="mr-4"
                />
            </InfoCard>
        </div>
    );
}
 
export default Invoice;