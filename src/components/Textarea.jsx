import { Textarea, Label, Input } from "@windmill/react-ui";

const TextareaInput = ({ label, placeholder }) => {
    return (
        <>
            <Label className="block text-sm text-gray-700 dark:text-gray-400 w-full h-fit">
            <span>{label}</span>
                <Textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />
            </Label>
            {/* <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}></textarea> */}
        </>
    );
}
 
export default TextareaInput;