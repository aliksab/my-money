import AuthProvider from "./hooks/useAuth";
import AppLoader from "./components/hoc/appLoader";
import { useLocation, useRoutes } from "react-router-dom";
import Header from "./components/Header";
import routes from "./routes";
import { getIsLoggedIn } from "./store/users";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const location = useLocation();
  const elements = useRoutes(routes(isLoggedIn, location));
  return (
    <>
    <AppLoader>
      <AuthProvider>
        <Header/>
          {elements}
      </AuthProvider>
    </AppLoader>
    <ToastContainer />
    </>
    
    
  );
}

export default App;
