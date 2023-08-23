import { Routes, Route } from "react-router-dom";
import FormRegistration from "../components/FormRegistration";
import FormLogin from "../components/FormLogin";
import LandingPage from "../components/LandingPage";
import LostObjectDetails from "../components/LostObjectDetails";

const RoutesForm = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/FormLogin" element={<FormLogin />} />
      <Route path="/FormRegistration" element={<FormRegistration />} />
      <Route path="/ladingPage" element={<LandingPage />} />
      <Route path="/LostObjectsDetails" element={<LostObjectDetails />} />
    </Routes>
  );
};

export default RoutesForm;
