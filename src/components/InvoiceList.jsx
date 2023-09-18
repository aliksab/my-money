import Invoice from "./Invoice";

const invoices = [
    {
        name: "invoice 1",
        amount: 324
    },
    {
        name: "invoice 2",
        amount: 515
    },{
        name: "invoice 3",
        amount: 12
    }
]
const InvoiceList = () => {
    return invoices.map(invoice => (
        <Invoice key={invoice.name} name={invoice.name} amount={invoice.amount} />
    ))
}
 
export default InvoiceList;