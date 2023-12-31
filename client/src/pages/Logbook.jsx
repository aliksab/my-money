import { EditIcon, TrashIcon } from "../icons";
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer
} from "@windmill/react-ui";
import { useDispatch, useSelector } from "react-redux";
import {
    getInvoiceManipulations,
    removeInvoiceManipulation
} from "../store/invoiceManipulation";
import { useEffect, useState } from "react";
import displayDate from "../utils/displayDate";
import { getInvoices, updateInvoices } from "../store/invoices";
import PageTitle from "../components/PageTitle";
import InvoiceManipulationForm from "../components/Forms/InvoiceManipulationForm";
import UpdateManipulationForm from "../components/Forms/UpdateManipulationForm";
import Pagination from "../components/pagination";
import MyModal from "../components/Modal";

const Logbook = () => {
    const dispatch = useDispatch();
    const manipulation = useSelector(getInvoiceManipulations());

    const invoice = useSelector(getInvoices());
    const getInvoiceName = (invoiceId) => {
        const findName = invoice.filter((i) => i._id === invoiceId);
        if (findName.length === 0) {
            return "Удаленный счет";
        }
        return findName[0].name;
    };
    const updateInvoice = (type, invoiceId, amount) => {
        console.log(type, invoiceId, amount);
        const updatedInvoice = invoice.filter(
            (invoice) => invoice._id === invoiceId
        );
        let newAmount = updatedInvoice[0].amount;
        type === "profit"
            ? (newAmount -= Number(amount))
            : (newAmount += Number(amount));
        const newData = { ...updatedInvoice[0], amount: newAmount };
        dispatch(updateInvoices(newData));
    };
    const [pageTable, setPageTable] = useState(1);
    const handleDelete = (
        manipulationId,
        type,
        invoiceId,
        manipulateAmount
    ) => {
        dispatch(removeInvoiceManipulation(manipulationId));
        updateInvoice(type, invoiceId, manipulateAmount);
        if (
            manipulation.findIndex(
                (manipulation) => manipulation._id === manipulationId
            ) <=
            (pageTable - 1) * resultsPerPage
        ) {
            if (manipulation.length - 1 <= (pageTable - 1) * resultsPerPage) {
                setPageTable(pageTable - 1);
            }
        }
    };
    const response = manipulation.concat([]);
    useEffect(() => {
        setDataTable(
            response.slice(
                (pageTable - 1) * resultsPerPage,
                pageTable * resultsPerPage
            )
        );
    }, [manipulation]);

    const [dataTable, setDataTable] = useState([]);
    function onPageChangeTable(p) {
        setPageTable(p);
    }
    useEffect(() => {
        setDataTable(
            response.slice(
                (pageTable - 1) * resultsPerPage,
                pageTable * resultsPerPage
            )
        );
    }, [pageTable]);

    const resultsPerPage = 5;
    const totalResults = manipulation.length;
    return (
        <>
            <PageTitle>Журнал</PageTitle>
            <MyModal title="Добавить транзакцию">
                <InvoiceManipulationForm />
            </MyModal>

            <TableContainer className="mb-2">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>Дата</TableCell>
                            <TableCell>Тип операции</TableCell>
                            <TableCell>Описание</TableCell>
                            <TableCell>Счёт</TableCell>
                            <TableCell>Сумма</TableCell>
                            <TableCell></TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {dataTable.map((trans) => (
                            <TableRow key={trans._id}>
                                <TableCell>
                                    <span className="text-sm">
                                        {displayDate(trans.createdAt)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {trans.type === "expense"
                                            ? "Расходы"
                                            : "Доходы"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {trans.description}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {getInvoiceName(trans.invoiceId)}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        {trans.amount}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <MyModal
                                            icon={
                                                <EditIcon
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                />
                                            }
                                        >
                                            <UpdateManipulationForm
                                                manipulationId={trans._id}
                                            />
                                        </MyModal>
                                        <button
                                            size="icon"
                                            aria-label="Delete"
                                            onClick={() =>
                                                handleDelete(
                                                    trans._id,
                                                    trans.type,
                                                    trans.invoiceId,
                                                    trans.amount
                                                )
                                            }
                                        >
                                            <TrashIcon
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="flex justify-center">
                <Pagination
                    itemCount={totalResults}
                    pageSize={resultsPerPage}
                    currentPage={pageTable}
                    onPageChange={onPageChangeTable}
                />
            </div>
        </>
    );
};

export default Logbook;
