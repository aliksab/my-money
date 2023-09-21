import { Input, Label } from "@windmill/react-ui";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { validator } from "../utils/validator";
import TextInput from "./TextInput";
import Button from "./Button";

const RegisterForm = () => {
    // const dispatch = useDispatch();
    const [data, setData] = useState({ });
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
                message: "Пароль должен содержать как минимум одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать как минимум одну цифру"
            },
            min: {
                message: "Пароль должен содержать как минимум 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Вы не можете использовать сервис без лицензионного соглашения"
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
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextInput type="email" placeholder="john@doe.com" label={"Email"} name="email" value={data.email} onChange={handleChange} error={errors.email} />
            <TextInput placeholder="***************" type="password" label={"Пароль"} name="password" value={data.password} onChange={handleChange} error={errors.password} />

              <Label className="mt-6" check>
                <Input type="checkbox"  value={data.licence} onChange={handleChange} name="licence" error={errors.licence}/>
                <span className="ml-2">
                  Подтвердить лицензионное соглашение
                </span>
              </Label>
              <Button>Зарегистрироваться</Button>
        </form>
    );
}
 
export default RegisterForm;