import { Input, Label } from "@windmill/react-ui";
import { useState } from "react";

const TextInput = ({label, placeholder, type, name, value, onChange, error}) => {
    const errorClass = "mt-2 text-sm text-red-600 dark:text-red-500"
    const validClass = "mt-2 text-sm text-green-600 dark:text-green-500"
    const defaultClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

    const [showPassword, setShowPassword] = useState(false);
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };


    return (
        <Label className="block text-sm text-gray-700 dark:text-gray-400 w-full h-fit">
            <span>{label}</span>
            <div className="relative text-gray-500 focus-within:text-purple-600">
                <Input className={defaultClass} placeholder={placeholder} type={showPassword ? "text" : type} id={name} name={name} value={value} onChange={handleChange} />
                {type === "password" && (
                    <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">Посмотреть</button>
                    // <button className="btn btn-secondary" type="button" onClick={toggleShowPassword}><i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i></button>
                )}
            </div>
            {error && <p className={errorClass}>{error}</p>}
        </Label>
    );
}
 
export default TextInput;