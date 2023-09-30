import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async (payload) => {
        const { data } = await httpService.get(userEndpoint, payload);
        console.log("data", data);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(userEndpoint + localStorageService.getUserID(), payload);
        return data;
    }
};

export default userService;
