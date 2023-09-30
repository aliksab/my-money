import httpService from "./http.service";

const invoiceEndpoint = "/invoice/";

const invoiceService = {
    createInvoice: async (payload) => {
        const { data } = await httpService.post(invoiceEndpoint, payload);
        return data;
    },
    getInvoice: async () => {
        const { data } = await httpService.get(invoiceEndpoint);
        return data;
    },
    removeInvoice: async (invoiceId) => {
        const { data } = await httpService.delete(invoiceEndpoint + invoiceId);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(invoiceEndpoint + payload._id, payload);
        return data; 
    }
};

export default invoiceService;