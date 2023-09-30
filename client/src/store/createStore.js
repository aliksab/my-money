import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import invoicesReducer from "./invoices";
import invoiceManipulationsReducer from "./invoiceManipulation";


const rootReducer = combineReducers({
    users: usersReducer,
    invoices: invoicesReducer,
    invoiceManipulation: invoiceManipulationsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
