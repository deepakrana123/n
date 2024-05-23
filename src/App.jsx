import "./App.css";
import Header from "./components/NavBar/Header";
import ShowScreen from "./pages/Screens/ShowScreen";
import { Route, Routes } from "react-router-dom";
import CreateScreens from "./pages/CreateScreens";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<ShowScreen />} />
        <Route path="/screen/:screenId" element={<CreateScreens />} />
      </Routes>
    </>
  );
}

export default App;
