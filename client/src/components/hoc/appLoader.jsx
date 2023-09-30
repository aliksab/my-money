import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, getIsLoggedIn, getUserById, getUsersLoadingStatus, loadUsersList } from "../../store/users";
import { useEffect } from "react";
import localStorageService, { getUserID } from "../../services/localStorage.service";
import { loadInvoiceManipulationList } from "../../store/invoiceManipulation";
import { loadInvoicesList } from "../../store/invoices";

const AppLoader = ({ children }) => {
   const dispatch = useDispatch();
   const isLoggedIn = useSelector(getIsLoggedIn());
   const usersStatusLoading = useSelector(getUsersLoadingStatus());
   useEffect(() => {
    if (isLoggedIn) {
        dispatch(loadUsersList());
    };
   }, [isLoggedIn]);
   const userId = getUserID()
   useEffect(() => {
       dispatch(loadInvoicesList(userId));
       dispatch(loadInvoiceManipulationList(userId));
   }, [userId])
   
   if (usersStatusLoading) return "Loading";
    return children;
};

export default AppLoader;
