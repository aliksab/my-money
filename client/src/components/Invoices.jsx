import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";
import { createInvoices, getInvoices, getInvoicesLoadingStatus, loadInvoicesList, removeInvoices } from "../store/invoices";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import InvoiceList from "./InvoiceList";
import { getCurrentUserId } from "../store/users";

const Invoices = () => {
    const { userId } = useSelector(getCurrentUserId());
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