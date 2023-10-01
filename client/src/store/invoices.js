import { createSlice, createAction } from "@reduxjs/toolkit";
import invoiceService from "../services/invoice.service";
import { getUserID } from "../services/localStorage.service";

const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        invoicesRequested: (state) => {
            state.isLoading = true;
        },
        invoicesReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        invoicesRequesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        invoicesCreate(state, action) {
            state.entities.push(action.payload);
        },
        invoicesDelete(state, action) {
            state.entities = state.entities.filter(c => c._id !== action.payload);
        },
        invoicesUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex(i => i._id === action.payload._id)
            ] = action.payload;
        }
    }
});
const { reducer: invoicesReducer, actions } = invoiceSlice;
const { invoicesRequested, invoicesReceved, invoicesRequesFiled, invoicesCreate, invoicesDelete, invoicesUpdate } = actions;
const newInvoicesRequested = createAction("invoice/newInvoicesRequested");
const deleteInvoicesRequested = createAction("invoice/deleteInvoicesRequested");
const invoiceUpdateRequested = createAction("invoice/invoiceUpdateRequested");
const invoiceUpdateFailed = createAction("invoice/invoiceUpdateFailed");

export const loadInvoicesList = (userId) => async (dispatch) => {
    dispatch(invoicesRequested());
    try {
        const { content } = await invoiceService.getInvoice(userId);
        dispatch(invoicesReceved(content));
    } catch (error) {
        dispatch(invoicesRequesFiled(error.message));
    }
};
export const createInvoices = (payload) => async (dispatch) => {
    dispatch(newInvoicesRequested(payload));
    try {
        const invoice = {
            ...payload,
            userId: getUserID()
        };
        const { content } = await invoiceService.createInvoice(invoice);
        dispatch(invoicesCreate(content));
    } catch (error) {
        dispatch(invoicesRequesFiled(error.message));
    }
};
export const removeInvoices = (invoiceId) => async (dispatch) => {
    dispatch(deleteInvoicesRequested());
    try {
        await invoiceService.removeInvoice(invoiceId);
        // dispatch(invoicesDelete(content));
        dispatch(invoicesDelete(invoiceId));
    } catch (error) {
        dispatch(invoicesRequesFiled(error.message));
    }
};
export const updateInvoices = payload => {
    return async dispatch => {
        dispatch(invoiceUpdateRequested());
        try {
            const { content } = await invoiceService.update(payload);
            dispatch(invoicesUpdate(content));
            // history.push(`/users/${content._id}`);
        } catch (error) {
            dispatch(invoiceUpdateFailed(error.message));
        }
    };
};
export const getInvoices = () => (state) => state.invoices.entities;
export const getInvoicesLoadingStatus = () => (state) => state.invoices.isLoading;

export default invoicesReducer;
