import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        if (configFile.isFireBase) {
            const containSlash = /\/$/.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refresh();
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccesToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        } else {
            if (refreshToken && expiresDate < Date.now()) {
                const data = await authService.refresh();
                localStorageService.setTokens({
                    refreshToken: data.refreshToken,
                    idToken: data.accessToken,
                    expiresIn: data.expiresIn,
                    localId: data.userId
                });
            }
            const accessToken = localStorageService.getAccesToken();
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
                };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data;
}
http.interceptors.response.use(
    (res) => {
        res.data = { content: transformData(res.data) };
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            toast.error("Somthing was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};

export default httpService;
