import PageTitle from "../PageTitle";
import {
    invoiceManipulationExpense,
    invoiceManipulationProfit,
    invoiceManipulationTypes
} from "../../utils/invoiceTypes";
import { getInvoices, updateInvoices } from "../../store/invoices";

import SelectField from "../SelectField";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import { validator } from "../../utils/validator";
import Button from "../Button";
import {
    getInvoiceManipulations,
    getInvoiceManipulationsLoadingStatus,
    updateInvoiceManipulation
} from "../../store/invoiceManipulation";

const UpdateManipulationForm = ({ manipulationId }) => {
    const ManipulationList = useSelector(getInvoiceManipulations());
    const updatedManipulation = ManipulationList.filter(
        (manipulation) => manipulation._id === manipulationId
    );
    const [data, setData] = useState(updatedManipulation[0]);
    const [errors, SetErrors] = useState({});
    const dispatch = useDispatch();
    const invoices = useSelector(getInvoices());
    const updatedInvoice = invoices.filter(
        (invoice) => invoice._id === data.invoiceId
    );
    const invoicesList = invoices.map((i) => ({ label: i.name, value: i._id }));
    const isLoading = useSelector(getInvoiceManipulationsLoadingStatus());

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

    console.log(updatedManipulation[0].amount);

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
            isRequired: {
                message: "Обязательно для заполнения"
            },
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
    // useEffect(() => {
    //     validate();
    // }, [data]);
    // const validate = () => {
    //     const errors = validator(data, validatorConfig);
    //     SetErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };
    const updateInvoice = (amount) => {
        let newAmount =
            updatedInvoice[0].amount - updatedManipulation[0].amount;
        data.type === "profit"
            ? (newAmount += Number(amount))
            : (newAmount -= Number(amount));
        const newData = { ...updatedInvoice[0], amount: newAmount };
        dispatch(updateInvoices(newData));
        // dispatch(getInvoices())
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        updateInvoice(data.amount);
        const newData = { ...data };
        dispatch(updateInvoiceManipulation(newData));
    };
    return !isLoading ? (
        <>
            <form onSubmit={handleSubmit}>
                <PageTitle>Изменить транзакцию</PageTitle>

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
                            placeholder={data.amount}
                            label={"Сумма дохода"}
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
                            defaultOption={data.manipulation}
                            value={data.manipulation}
                            error={errors.manipulation}
                        />
                        <TextInput
                            type="text"
                            placeholder={data.description}
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
                            placeholder={data.amount}
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
                            defaultOption={data.manipulation}
                            value={data.manipulation}
                            error={errors.manipulation}
                        />
                        <TextInput
                            type="text"
                            placeholder={data.description}
                            label={"Название"}
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            error={errors.description}
                        />
                    </>
                )}
                <Button>Сохранить</Button>
            </form>
        </>
    ) : (
        "Loading.."
    );
};

export default UpdateManipulationForm;
