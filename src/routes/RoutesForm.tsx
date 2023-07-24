import { Routes, Route } from "react-router-dom";
import FormRegistration from "../components/FormRegistration";
import FormLogin from "../components/FormLogin";
import LandingPage from "../components/LandingPage";

const RoutesForm = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/FormLogin" element={<FormLogin />} />
      <Route path="/FormRegistration" element={<FormRegistration />} />
      <Route path="/LoadingPages" element={<LandingPage />}></Route>
    </Routes>
  );
};

export default RoutesForm;
