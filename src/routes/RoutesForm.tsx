import { Routes, Route } from "react-router-dom";
import FormRegistration from "../components/FormRegistration";
import FormLogin from "../components/FormLogin";
import LandingPage from "../components/LandingPage";
import LostObjectDetails from "../components/LostObjectDetails";
import DetailsReports from "../components/DetailsReports";
import FoundObjects from "../components/FoundObjects";
import LostAndFoundList from "../components/LostAndFoundList";

const RoutesForm = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/FormLogin" element={<FormLogin />} />
      <Route path="/FormRegistration" element={<FormRegistration />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/LostObjectsDetails" element={<LostObjectDetails />} />
      <Route path="/DetailsReports" element={<DetailsReports />} />
      <Route path="/FoundObjects" element={<FoundObjects />} />
      <Route path="/LostAndFoundList" element={<LostAndFoundList />} />
    </Routes>
  );
};

export default RoutesForm;
