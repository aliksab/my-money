import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { setTokens } from "../services/localStorage.service";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../store/users";
import { loadInvoicesList } from "../store/invoices";
import { loadInvoiceManipulationList } from "../store/invoiceManipulation";
import { useDispatch, useSelector } from "react-redux";
import MainSkeleton from "../components/skeleton/MainSkeleton";

export const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const userId = useSelector(getCurrentUserId())
    // console.log(userId);

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({ ...rest });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorObject = { email: "Пользователь с таким Email уже существует" };
                if (message === "EMAIL_EXISTS") {
                    throw errorObject;
                }
            }
        }
    };
    async function signIn({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await authUser({ _id: data.localId, email, ...rest });
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = { email: "Пользователь с таким Email не найден" };
                    throw errorObject;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Неправильный пароль" };
                    throw errorObject;
                }
            }
        }
    };
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function updateUser(data) {
        try {
            const { content } = await userService.update(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
      }
    async function authUser(data) {
        try {
            const { content } = userService.getOne(data);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    async function getUserData() {
        try {
            const { content } = await userService.get();
            setCurrentUser(content);
            console.log(content);
            await dispatch(loadInvoicesList(content._id));
            await dispatch(loadInvoiceManipulationList(content._id));
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccesToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function logout() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        navigate('/login')
    }
    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser, logout, updateUser }}>
            {!isLoading ? children : <MainSkeleton/>}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
