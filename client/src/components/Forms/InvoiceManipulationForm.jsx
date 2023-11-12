import PageTitle from "../PageTitle";
import {
    invoiceManipulationExpense,
    invoiceManipulationProfit,
    invoiceManipulationTypes
} from "../../utils/invoiceTypes";
import {
    getInvoices,
    getInvoicesLoadingStatus,
    updateInvoices
} from "../../store/invoices";

import SelectField from "../SelectField";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { validator } from "../../utils/validator";
import Button from "../Button";
import { createInvoiceManipulation } from "../../store/invoiceManipulation";

const InvoiceManipulationForm = () => {
    const [data, setData] = useState({description: "", amount: 0});
    const [errors, SetErrors] = useState({});
    const dispatch = useDispatch();
    const isLoading = useSelector(getInvoicesLoadingStatus());
    const invoices = useSelector(getInvoices());
    const updatedInvoice = invoices.filter(
        (invoice) => invoice._id === data.invoiceId
    );
    const invoicesList = invoices.map((i) => ({ label: i.name, value: i._id }));

    const manipulationTypesList = invoiceManipulationTypes.map(
        (manipulation) => ({
            label: manipulation.label,
            value: manipulation.name
        })
    );
    const profit = invoiceManipulationProfit.map((manipulation) => ({
        label: manipulation.label,
        value: manipulation.name
    }));
    const expense = invoiceManipulationExpense.map((manipulation) => ({
        label: manipulation.label,
        value: manipulation.name
    }));

    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        description: {
            isRequired: {
                message: "Название обязательно для заполнения"
            }
        },
        amount: {
            min: {
                message: "Сумма должна содержать хотя-бы одну цифру",
                value: 1
            }
        },
        type: {
            isRequired: {
                message: "Обязательно выберите тип счёта"
            }
        },
        invoiceId: {
            isRequired: {
                message: "Обязательно выберите счёт"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        SetErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const updateInvoice = (amount) => {
        let newAmount = updatedInvoice[0].amount;
        data.type === "profit"
            ? (newAmount += Number(amount))
            : (newAmount -= Number(amount));
        const newData = { ...updatedInvoice[0], amount: newAmount };
        dispatch(updateInvoices(newData));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.description === "") data.description="Транзакция"
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data };
        updateInvoice(data.amount);
        dispatch(createInvoiceManipulation(newData));
    };
    return !isLoading ? (
        <>
            <form onSubmit={handleSubmit}>
                <PageTitle>Новая транзакция</PageTitle>
                <SelectField
                    label="Выбери тип транзакции"
                    name="type"
                    options={manipulationTypesList}
                    onChange={handleChange}
                    value={data.type}
                    error={errors.type}
                />
                {data.manipulation === "profit" ? (
                    <>
                        <TextInput
                            type="text"
                            placeholder="1000"
                            label={"Сумма расхода"}
                            name="amount"
                            value={data.amount}
                            onChange={handleChange}
                            error={errors.amount}
                        />
                        <SelectField
                            label="Выберите счёт"
                            name="invoiceId"
                            options={invoicesList}
                            onChange={handleChange}
                            value={data.invoiceId}
                            error={errors.invoiceId}
                        />
                        <SelectField
                            label="Выберите категорию"
                            name="manipulation"
                            options={data.type === "profit" ? profit : expense}
                            onChange={handleChange}
                            value={data.manipulation}
                            error={errors.manipulation}
                        />
                        <TextInput
                            type="text"
                            placeholder="Например: Проценты по вкладу"
                            label={"Название"}
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            error={errors.description}
                        />
                    </>
                ) : (
                    <>
                        <TextInput
                            type="text"
                            placeholder="1000"
                            label={"Сумма расхода"}
                            name="amount"
                            value={data.amount}
                            onChange={handleChange}
                            error={errors.amount}
                        />
                        <SelectField
                            label="Выберите счёт"
                            name="invoiceId"
                            options={invoicesList}
                            onChange={handleChange}
                            value={data.invoiceId}
                            error={errors.invoiceId}
                        />
                        <SelectField
                            label="Выберите категорию"
                            name="manipulationExpense"
                            options={data.type === "profit" ? profit : expense}
                            onChange={handleChange}
                            value={data.manipulation}
                            error={errors.manipulation}
                        />
                        <TextInput
                            type="text"
                            placeholder="Например: Списание кредита"
                            label={"Название"}
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            error={errors.description}
                        />
                    </>
                )}
                <Button>Создать</Button>
            </form>
        </>
    ) : (
        "Loading.."
    );
};

export default InvoiceManipulationForm;
