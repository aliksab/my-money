import { useEffect, useState } from "react";
import Invoice from "./Invoice";
import Pagination from "./pagination";

const InvoiceList = ({ invoices }) => {
    const [pageTable, setPageTable] = useState(1)
    const response = invoices.concat([])
    const [dataTable, setDataTable] = useState([])
    function onPageChangeTable(p) {
        setPageTable(p)
    }
    useEffect(() => {
        setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
      }, [pageTable])
    const resultsPerPage = 3
    const totalResults = invoices.length
    return (
        <>
            {dataTable.map(invoice => (
                <Invoice key={invoice._id} invoiceId={invoice._id} name={invoice.name} amount={invoice.amount} />
            ))}
            <div className='flex justify-center'>
                <Pagination
                    itemCount={totalResults}
                    pageSize={resultsPerPage}
                    currentPage={pageTable}
                    onPageChange={onPageChangeTable}
                />
            </div>
        </>
    )
}
 
export default InvoiceList;