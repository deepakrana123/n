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
import Protected from "./pages/ProtectedRoute";
import { useSelector } from "react-redux";
import Template from "./pages/Template/template";
import CreateTemplate from "./pages/Template/createTemplate";
import CreateSingleForm from "./pages/Template/createSingleForm";
import CreateStepForm from "./pages/Template/createStepForm";

function App() {
  let isSignedIn = false;
  const user = useSelector((state) => state.screen.user);
  if (user) {
    isSignedIn = true;
  }
  console.log(isSignedIn, "hihi");
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/register" element={<Regisiter />} />
        <Route
          path="/"
          element={
            <Protected isSignedIn={true}>
              <Template />
            </Protected>
          }
        />
        <Route
          path="/createTemplate"
          element={
            <Protected isSignedIn={true}>
              <CreateTemplate />
            </Protected>
          }
        />
        {/* <Route
          path="/getAllScreenOfTemplate"
          element={
            <Protected isSignedIn={true}>
              <CreateTemplate />
            </Protected>
          }
        /> */}
        <Route
          path="/createSingleForm"
          element={
            <Protected isSignedIn={true}>
              <CreateSingleForm />
            </Protected>
          }
        />
        <Route
          path="/getAllScreenOfTemplate"
          element={
            <Protected isSignedIn={true}>
              <ShowScreen />
            </Protected>
          }
        />
        <Route
          path="/screen/:id"
          element={
            <Protected isSignedIn={isSignedIn}>
              <CreateScreens />
            </Protected>
          }
        />
        <Route
          path="/createStepForm"
          element={
            <Protected isSignedIn={isSignedIn}>
              <CreateStepForm />
            </Protected>
          }
        />
        <Route
          path="/flow"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Flow />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
