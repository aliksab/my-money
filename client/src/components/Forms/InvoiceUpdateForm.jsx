import PageTitle from "../PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { validator } from "../../utils/validator";
import Button from "../Button";
import { getInvoices, updateInvoices } from "../../store/invoices";

const InvoiceUpdateForm = ({invoiceId}) => {
    const dispatch = useDispatch();
    const InvoiceList = useSelector(getInvoices())
    const updatedInvoice = InvoiceList.filter(invoice => invoice._id === invoiceId)
    const [data, setData] = useState(updatedInvoice[0]);
    const [errors, SetErrors] = useState({});
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Название обязательно для заполнения"
            },
            min: {
                message: "Название должно содержать как минимум 3 символа",
                value: 3
            }
        },
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        SetErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data };
        dispatch(updateInvoices(newData));
    }
    return (
        <>  
            <form onSubmit={handleSubmit}>
                <PageTitle>Внести изменения</PageTitle>
                <TextInput type="text" placeholder={data.name} label={"Имя счёта"} name="name" value={data.name} onChange={handleChange} error={errors.name} />
                <Button>Сохранить</Button>
            </form>
        </>
        
    );
}
 
export default InvoiceUpdateForm;