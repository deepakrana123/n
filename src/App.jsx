import "./App.css";
import Header from "./components/NavBar/Header";
import ShowScreen from "./pages/Screens/ShowScreen";
import { Route, Routes } from "react-router-dom";
import CreateScreens from "./pages/CreateScreens";
import Flow from "./pages/Flow/Flow";
import Login from "./pages/Auth/login";
import ForgetPassword from "./pages/Auth/forgetPassword";
import ResetPassword from "./pages/Auth/resetPassword";
import Regisiter from "./pages/Auth/regisiter";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/registor" element={<Regisiter />} />
        <Route path="/" element={<ShowScreen />} />
        <Route path="/screen/:id" element={<CreateScreens />} />
        <Route path="/flow" element={<Flow />} />
      </Routes>
    </>
  );
}

export default App;
