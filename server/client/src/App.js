import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreatePlan from "./pages/createPlan/CreatePlan";
import Error from "./pages/error/Error";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/editProfile/EditProfile";
import EditPlan from "./pages/editPlan/EditPlan";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createplan" element={<CreatePlan />} />
          <Route path="/editPlan" element={<EditPlan />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
