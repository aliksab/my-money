import TradingViewWidget from "./pages/tradingview";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import EditUserPage from "./pages/EditUserPage";
import SettingProfile from "./pages/SettingProfile";
import Logbook from "./pages/Logbook"
import Container from "./containers/Container";
import Header from "./components/Header";

function App() {
  return (
    <>
    <Header/>
    <Container>
      <Routes>
        <Route path="" element={<MainPage/>} />
        <Route path="login/:type?" element={<Login/>} />
        <Route path="home/*">
          <Route path="" element={<Home/>} />
          <Route path="editProfile" element={<EditUserPage/>} />
          <Route path="settingProfile" element={<SettingProfile/>} />
          <Route path="logbook" element={<Logbook/>} />
          <Route path="trading" element={<TradingViewWidget/>} />
        </Route>
      </Routes>
    </Container>
    </>
    
    
  );
}

export default App;
