import React from "react";

const SelectField = ({ label, value, onChange, defaultOption, options, error, name }) => {
    const errorClass = "mt-2 text-sm text-red-600 dark:text-red-500"
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const optionsArray = !Array.isArray(options) && typeof (options) === "object" ? (Object.keys(options).map(optionName => ({ name: options[optionName].name, value: options[optionName]._id }))) : options;
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id={name} name={name} value={value} onChange={handleChange} required>
                <option selected disabled>{defaultOption}</option>
                {
                    optionsArray && optionsArray.map(option => <option value={option.value} key={option.value}>{option.label}</option>)
                }
            </select>
            {error && <div className={errorClass}>
                {error}
            </div>}
        </div>
    );
};

export default SelectField;
