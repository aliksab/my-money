import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { unstable_HistoryRouter } from "react-router-dom";
import TextInput from "./TextInput";
import { Input, Label } from "@windmill/react-ui";
import { validator } from "../utils/validator";
import Button from "./Button";



const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    // const loginError = useSelector(getAuthError());
    // const history = unstable_HistoryRouter();
    // const dispatch = useDispatch();
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
        const isValid = validate();
        if (!isValid) return;
        // const redirect = history.location.state
        //     ? history.location.state.from.pathname
        //     : "/";
        console.log(data);
        // dispatch(login({ payload: data, redirect }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextInput type="email" placeholder="john@doe.com" label={"Email"} name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextInput placeholder="***************" type="password" label={"Пароль"} name="password" value={data.password} onChange={handleChange} error={errors.password} />
            <Label className="mt-6" check>
                <Input type="checkbox" value={data.licence} onChange={handleChange} name="licence" error={errors.licence}/>
                <span className="ml-2">
                  Оставаться в системе
                </span>
              </Label>
            {/* {loginError && <p className="text-danger">{loginError}</p>} */}
            <Button>Вход</Button>
        </form>
    );
}
 
export default LoginForm;