import { Routes, Route } from "react-router-dom";
import FormRegistration from "../components/FormRegistration";
import FormLogin from "../components/FormLogin";
import LandingPage from "../components/LandingPage";
import LostObjectDetails from "../components/LostObjectDetails";
import DetailsReports from "../components/DetailsReports";


const RoutesForm = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/FormLogin" element={<FormLogin />} />
      <Route path="/FormRegistration" element={<FormRegistration />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/LostObjectsDetails" element={<LostObjectDetails />} />
      <Route path="/DetailsReports" element={<DetailsReports />} />
    </Routes>
  );
};

export default RoutesForm;
