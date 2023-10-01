import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from "../../store/users";
import { useEffect } from "react";
import { getUserID } from "../../services/localStorage.service";
import { loadInvoiceManipulationList } from "../../store/invoiceManipulation";
import { getInvoices, getInvoicesLoadingStatus, loadInvoicesList } from "../../store/invoices";

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

   const invoicesStatusLoading = useSelector(getInvoicesLoadingStatus())

   
   if (usersStatusLoading && invoicesStatusLoading) return "Loading";
    return children;
};

export default AppLoader;
