import { useState } from "react";
import Button from "./Button";
import Example from "./modalic";
import InvoiceForm from "./Forms/InvoiceForm";

const Modal = ({ title, icon, children }) => {
    const [open, setOpen] = useState(false)
    const handleModalOpen = () => {
        setOpen(true);
      };
    return (
        <>
        {!!title ? <Button toggleButton={handleModalOpen}>{title}</Button> : <button className='flex items-center width-full text-gray-800 dark:text-gray-200' onClick={handleModalOpen}>{icon}</button>}
        {open && (<Example status={true} >{children}</Example>)}
        </>
    );
}
 
export default Modal;