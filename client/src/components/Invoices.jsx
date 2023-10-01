import { useDispatch, useSelector } from "react-redux";
import { getInvoices, getInvoicesLoadingStatus, loadInvoicesList, removeInvoices } from "../store/invoices";
import { useEffect } from "react";
import InvoiceList from "./InvoiceList";
import { getCurrentUserId } from "../store/users";

const Invoices = () => {
    const userId = useSelector(getCurrentUserId());
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadInvoicesList(userId));
    }, [userId]);
    const isLoading = useSelector(getInvoicesLoadingStatus());
    const invoices = useSelector(getInvoices());
    const handleRemoveInvoices = (id) => {
        dispatch(removeInvoices(id));
    };
    return (
        invoices.length > 0 && (
            !isLoading ? <InvoiceList invoices={invoices} onRemove={handleRemoveInvoices} /> : "Loading..."
        )
    )
}
 
export default Invoices;