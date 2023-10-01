import { useDispatch } from "react-redux";
import { MoneyIcon, EditIcon, TrashIcon } from "../icons";
import InfoCard from "./InfoCard";
import RoundIcon from "./RoundIcon";
import { removeInvoices } from "../store/invoices";
import InvoiceUpdateForm from "./Forms/InvoiceUpdateForm";
import Modal from "./Modals";

const Invoice = ({ invoiceId, name, amount }) => {
    const dispatch = useDispatch()
    const handleDelete = (invoiceId) => {
        dispatch(removeInvoices(invoiceId))
    }

    return (
        <div className="w-full my-2 rounded bg-gray relative">
            <InfoCard id="invoice" icon={<RoundIcon icon={MoneyIcon}/>} title={name} value={`${amount.toLocaleString('ru')}  ₽`}>
                <div className="flex items-center width-full justify-end">
                    <Modal icon={<EditIcon className="w-5 h-5" aria-hidden="true" />}><InvoiceUpdateForm invoiceId={invoiceId}/></Modal>
                    <button className={"text-gray-800 dark:text-gray-200"} size="icon" aria-label="Delete" onClick={() => handleDelete(invoiceId)}>
                        <TrashIcon className="w-5 h-5 mx-2" aria-hidden="true" />
                    </button>
                </div>
            </InfoCard>
        </div>
    );
}
 
export default Invoice;