import TradingViewWidget from "./pages/tradingview";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount"
import EditUserPage from "./pages/EditUserPage";
import SettingProfile from "./pages/SettingProfile";
import Logbook from "./pages/Logbook"
import Container from "./containers/Container";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="" element={<MainPage/>} />
        <Route path="login" element={<Login/>} />
        <Route path="create-account" element={<CreateAccount/>} />
        <Route path="home/*">
          <Route path="" element={<Home/>} />
          <Route path="editProfile" element={<EditUserPage/>} />
          <Route path="settingProfile" element={<SettingProfile/>} />
          <Route path="logbook" element={<Logbook/>} />
          <Route path="trading" element={<TradingViewWidget/>} />
        </Route>
      </Routes>
    </Container>
    
  );
}

export default App;
