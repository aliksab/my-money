import TextInput from "../components/TextInput";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUserData, updateUser } from "../store/users";
import { validator } from "../utils/validator";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";


const EditUserPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({ ...currentUser });
    useEffect(() => {
      if (currentUser) {
        setData({ ...currentUser });
      }
    }, [currentUser]);
    useEffect(() => {
      if (data._id) {
        setLoading(false);
      }
    }, [data]);
  
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
        console.log(data);
    };
    const handleChangeFile = async (e) => {
        console.log(e.target.files[0].name);
        // try {
        //     const formData = new FormData();
        //     const file = e.target.files[0];
        //     formData.append('image', file);
            // const {data} = await userService.post(formData)
            // setData((prev) => ({ ...prev, [data.image]: e.target.files[0] }));
        //     console.log(formData);
        // } catch (error) {
            
        // }
    }
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введён некорректно"
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
        firstName: {
            min: {
                message: "Имя должно содержать как минимум 2 символа",
                value: 2
            }
        },
        lastName: {
            min: {
                message: "Фамилия должна содержать как минимум 2 символа",
                value: 2
            }
        },
        secondName: {
            min: {
                message: "Отчество должно содержать как минимум 2 символа",
                value: 2
            }
        },
        userName: {
            min: {
                message: "Имя должно содержать как минимум 2 символа",
                value: 2
            }
        },
        descriptions: {
            min: {
                message: "Описание должно содержать как минимум 10 символов",
                value: 2
            }
        },
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const newData = {
          ...data
        };
        dispatch(updateUser(newData));
      } catch (error) {
        console.log(error);
      }
    };
    const stopButton = () => {
        toast('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }
    return (
        <>
            {!loading ? <form className="block" onSubmit={handleSubmit}>
                <PageTitle>Мой аккаунт</PageTitle>
                <div className="flex">
                    <div className="w-1/4 m-auto flex flex-col items-center cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
                    {/* <img className="rounded" src={data.image} value={data.image}/> */}
                    <button value={data.image} placeholder={data.image}>
                        {/* <img className="rounded" src={data.image} />s */}
                        <label for="user_avatar" value={data.image}><img className="rounded" src={data.image} /></label>
                        <Button>Изменить фото профиля</Button>

                        {/* <input type="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" onChange={handleChangeFile} name={data.image}/> */}
                    </button>
                    <Button toggleButton={stopButton}>Подключить telegram</Button>
                    </div>
                    <div className="mx-4 w-full">
                    <div className="flex flex-col justify-between gap-2 h-fit">
                            <TextInput type="text" placeholder={data.lastName} label={"Фамилия"} name="lastName" value={data.lastName} onChange={handleChange} error={errors.lastName} />
                            <TextInput type="text" placeholder={data.firstName} label={"Имя"} name="firstName" value={data.firstName} onChange={handleChange} error={errors.firstName} />
                            <TextInput type="text" placeholder={data.secondName}  label={"Отчество"} name="secondName" value={data.secondName} onChange={handleChange} error={errors.secondName} />
                            <TextInput type="email" placeholder={data.email} label={"Email"} name="email" value={data.email} onChange={handleChange} error={errors.email} />
                            <TextInput placeholder={data.userName}  type="text" label={"Логин"} name="userName" value={data.userName} onChange={handleChange} error={errors.userName} />
                        </div> 
                    </div>
                </div>
                
                
                <Textarea placeholder={data.descriptions} type="text" label={"О себе"} name="descriptions" value={data.descriptions} onChange={handleChange} error={errors.descriptions} />
                
                <Button>Сохранить</Button>
            </form> : <h3>Загрузка..</h3>}
            
        </>
    );
}
 
export default EditUserPage;