import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextInput from "../TextInput";
import { validator } from "../../utils/validator";
import Button from "../Button";
import { getAuthError, login } from "../../store/users";
import CheckBoxField from "../CheckField";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const loginError = useSelector(getAuthError());
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        const redirect = navigate('/api')
        dispatch(login({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextInput type="email" placeholder="john@doe.com" label={"Email"} name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextInput placeholder="***************" type="password" label={"Пароль"} name="password" value={data.password} onChange={handleChange} error={errors.password} />
            <CheckBoxField 
                value={data.licence}
                onChange={handleChange}
                name="licence"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <Button>Вход</Button>
        </form>
    );
}
 
export default LoginForm;