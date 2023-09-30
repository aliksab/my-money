import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import invoiceService from "../services/invoice.service";

const InvoicesContext = React.createContext();

export const useInvoices = () => {
    return useContext(InvoicesContext);
};

export const InvoicesProvider = ({ children }) => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getInvoice();
    }, [userId]);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    // async function createInvoices(data) {
    //     try {
    //         const { content } = await invoiceService.createInvoice(comment);
    //         setInvoices(prev => [...prev, content]);
    //     } catch (error) {
    //         errorCatcher(error);
    //     }
    // };
    async function getInvoice() {
        try {
            const { content } = await invoiceService.getInvoice(userId);
            setInvoices(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };
    async function removeInvoice(id) {
        try {
            const { content } = await invoiceService.removeInvoice(id);
            if (content === null) {
                setInvoices(prev => prev.filter(invoice => invoice._id !== id));
            }
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <InvoicesContext.Provider value={ { invoices, isLoading, removeInvoice } }>
           {children}
        </InvoicesContext.Provider>
    );
};
