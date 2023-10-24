import React from "react";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const errorClass = "mt-2 text-sm text-red-600 dark:text-red-500";
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    return (
        <div className="flex items-start my-4">
            <div className="flex items-center h-5">
                <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    value=""
                    onChange={handleChange}
                    id={name}
                    checked={value}
                />
            </div>
            <label
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                htmlFor={name}
            >
                {children}
            </label>
            {error && <div className={errorClass}>{error}</div>}
        </div>
    );
};

export default CheckBoxField;
