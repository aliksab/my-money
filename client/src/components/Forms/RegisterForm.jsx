import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";
import { validator } from "../../utils/validator";
import TextInput from "../TextInput";
import Button from "../Button";
import CheckBoxField from "../CheckField";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [errors, SetErrors] = useState({});
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно содержать как минимум 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message:
                    "Пароль должен содержать как минимум одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать как минимум одну цифру"
            },
            min: {
                message: "Пароль должен содержать как минимум 8 символов",
                value: 8
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать сервис без лицензионного соглашения"
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
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = { ...data };
        dispatch(signUp(newData));
        navigate("/home");
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                type="email"
                placeholder="john@doe.com"
                label={"Email"}
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextInput
                placeholder="***************"
                type="password"
                label={"Пароль"}
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
            >
                Согласие на обработку персональных данных
            </CheckBoxField>
            <Button>Зарегистрироваться</Button>
        </form>
    );
};

export default RegisterForm;
