import httpService from "./http.service";

const invoiceManipulationEndpoint = "/invoiceManipulation/";

const invoiceManipulationService = {
    createInvoiceManipulation: async (payload) => {
        const { data } = await httpService.post(invoiceManipulationEndpoint, payload);
        return data;
    },
    getInvoiceManipulation: async (payload) => {
        const { data } = await httpService.get(invoiceManipulationEndpoint, payload);
        return data;
    },
    removeInvoiceManipulation: async (id) => {
        const { data } = await httpService.delete(invoiceManipulationEndpoint + id);
        return data;
    },
    updateInvoiceManipulation: async (payload) => {
        const { data } = await httpService.patch(invoiceManipulationEndpoint + payload._id, payload);
        return data;
    }
};

export default invoiceManipulationService;