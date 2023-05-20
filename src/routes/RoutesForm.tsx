import { Routes, Route } from "react-router-dom";
import FormRegistration from "../components/FormRegistration";
import FormLogin from "../components/FormLogin";

const RoutesForm = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/FormLogin" element={<FormLogin />} />
      <Route path="/FormRegistration" element={<FormRegistration />} />
    </Routes>
  );
};

export default RoutesForm;
