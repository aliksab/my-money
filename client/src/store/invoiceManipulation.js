import { createSlice, createAction } from "@reduxjs/toolkit";
import invoiceManipulationService from "../services/invoiceManipulation.service";

const invoiceManipulationSlice = createSlice({
    name: "invoiceManipulation",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        invoiceManipulationRequested: (state) => {
            state.isLoading = true;
        },
        invoiceManipulationReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        invoiceManipulationRequesFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        invoiceManipulationCreate(state, action) {
            state.entities.push(action.payload);
        },
        invoiceManipulationDelete(state, action) {
            state.entities = state.entities.filter(c => c._id !== action.payload);
        },
        invoiceManipulationUpdate: (state, action) => {
            state.entities[
                state.entities.findIndex(i => i._id === action.payload._id)
            ] = action.payload;
        }
    }
});
const { reducer: invoiceManipulationReducer, actions } = invoiceManipulationSlice;
const { invoiceManipulationRequested, invoiceManipulationReceved, invoiceManipulationRequesFiled, invoiceManipulationCreate, invoiceManipulationDelete, invoiceManipulationUpdate } = actions;
const newInvoiceManipulationRequested = createAction("invoiceManipulation/newInvoiceManipulationRequested");
const deleteInvoiceManipulationRequested = createAction("invoiceManipulation/deleteInvoiceManipulationRequested");
const invoiceManipulationUpdateRequested = createAction("invoiceManipulation/invoiceManipulationUpdateRequested");
const invoiceManipulationUpdateFailed = createAction("invoiceManipulation/invoiceManipulationUpdateFailed");

export const loadInvoiceManipulationList = (userId) => async (dispatch) => {
    await dispatch(invoiceManipulationRequested());
    try {
        const { content } = await invoiceManipulationService.getInvoiceManipulation(userId);
        dispatch(invoiceManipulationReceved(content));
    } catch (error) {
        dispatch(invoiceManipulationRequesFiled(error.message));
    }
};
export const createInvoiceManipulation = (payload) => async (dispatch) => {
    dispatch(newInvoiceManipulationRequested(payload));
    try {
        const invoiceManipulation = {
            ...payload
        };
        const { content } = await invoiceManipulationService.createInvoiceManipulation(invoiceManipulation);
        dispatch(invoiceManipulationCreate(content));
    } catch (error) {
        dispatch(invoiceManipulationRequesFiled(error.message));
    }
};
export const removeInvoiceManipulation = (invoiceManipulationId) => async (dispatch) => {
    dispatch(deleteInvoiceManipulationRequested());
    console.log(invoiceManipulationId);
    try {
        await invoiceManipulationService.removeInvoiceManipulation(invoiceManipulationId);
        // dispatch(invoicesDelete(content));
        dispatch(invoiceManipulationDelete(invoiceManipulationId));
    } catch (error) {
        dispatch(invoiceManipulationRequesFiled(error.message));
    }
};
export const updateInvoiceManipulation = payload => {
    return async dispatch => {
        dispatch(invoiceManipulationUpdateRequested());
        try {
            const { content } = await invoiceManipulationService.updateInvoiceManipulation(payload);
            dispatch(invoiceManipulationUpdate(content));
            // history.push(`/users/${content._id}`);
        } catch (error) {
            dispatch(invoiceManipulationUpdateFailed(error.message));
        }
    };
};
export const getInvoiceManipulations = () => (state) => state.invoiceManipulation.entities;
export const getInvoiceManipulationsLoadingStatus = () => (state) => state.invoiceManipulation.isLoading;

export default invoiceManipulationReducer;
