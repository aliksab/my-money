import PageTitle from "../PageTitle";
import { invoiceTypes } from "../../utils/invoiceTypes";
import SelectField from "../SelectField";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { validator } from "../../utils/validator";
import Button from "../Button";
import { createInvoices, getInvoices, loadInvoicesList, updateInvoices } from "../../store/invoices";
import { getCurrentUserId } from "../../store/users";

const InvoiceUpdateForm = ({invoiceId}) => {
    const dispatch = useDispatch();
    const InvoiceList = useSelector(getInvoices())
    const updatedInvoice = InvoiceList.filter(invoice => invoice._id === invoiceId)
    const [data, setData] = useState(updatedInvoice[0]);
    console.log(data);
    const [errors, SetErrors] = useState({});
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    // const validatorConfig = {
    //     name: {
    //         isRequired: {
    //             message: "Название обязательно для заполнения"
    //         },
    //         min: {
    //             message: "Название должно содержать как минимум 3 символа",
    //             value: 3
    //         }
    //     },
    //     amount: {
    //         isRequired: {
    //             message: "Обязательно для заполнения"
    //         },
    //         isContainDigit: {
    //             message: "Пароль должен содержать как минимум одну цифру"
    //         },
    //         min: {
    //             message: "На счету должен быть хотя-бы ноль",
    //             value: 1
    //         }
    //     },
    //     invoice: {
    //         isRequired: {
    //             message: "Обязательно выберите тип счёта"
    //         }
    //     },
    // };
    // useEffect(() => {
    //     validate();
    // }, [data]);
    // const validate = () => {
    //     const errors = validator(data, validatorConfig);
    //     SetErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };
    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        const newData = { ...data };
        dispatch(updateInvoices(newData));
        console.log(newData);
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