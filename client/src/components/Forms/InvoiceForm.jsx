import PageTitle from "../PageTitle";
import { invoiceTypes } from "../../utils/invoiceTypes";
import SelectField from "../SelectField";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { validator } from "../../utils/validator";
import Button from "../Button";
import { createInvoices } from "../../store/invoices";

const InvoiceForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ });
    const [errors, SetErrors] = useState({});
    const invoiceList = invoiceTypes.map((invoice) => ({ label: invoice.label, value: invoice.name }));
    const handleCreateInvoice = (data) => {
        // dispatch(createInvoice({ ...data, pageId: userId }));
    };
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
        amount: {
            isRequired: {
                message: "Обязательно для заполнения"
            },
            isContainDigit: {
                message: "Пароль должен содержать как минимум одну цифру"
            },
            min: {
                message: "На счету должен быть хотя-бы ноль",
                value: 1
            }
        },
        invoice: {
            isRequired: {
                message: "Обязательно выберите тип счёта"
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
        dispatch(createInvoices(newData));
    }
    return (
        <>  
            <form onSubmit={handleSubmit}>
                <PageTitle>Новый счёт</PageTitle>
                <SelectField label="Выбери счёт" name="invoice" defaultOption="Выберите.." options={invoiceList} onChange={handleChange} value={data.invoice} error={errors.invoice} />
                <TextInput type="text" placeholder="BankOfRussian" label={"Имя счёта"} name="name" value={data.name} onChange={handleChange} error={errors.name} />
                <TextInput type="number" placeholder="100000" label={"Сумма"} name="amount" value={data.amount} onChange={handleChange} error={errors.amount} />
                <Button>Создать счёт</Button>
            </form>
        </>
        
    );
}
 
export default InvoiceForm;