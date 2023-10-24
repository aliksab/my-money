import { useDispatch, useSelector } from "react-redux";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList
} from "../../store/users";
import { useEffect } from "react";
import {
    getInvoicesLoadingStatus,
} from "../../store/invoices";
import MainSkeleton from "../skeleton/MainSkeleton";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const usersStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    const invoicesStatusLoading = useSelector(getInvoicesLoadingStatus());

    if (usersStatusLoading && invoicesStatusLoading) return <MainSkeleton />;
    return children;
};

export default AppLoader;
