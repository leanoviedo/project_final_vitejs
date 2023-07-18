import { Routes, Route } from "react-router-dom";
import FormRegistration from "../components/FormRegistration";
import FormLogin from "../components/FormLogin";
import LoadingPages from "../components/LoadingPages";

const RoutesForm = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin />} />
      <Route path="/FormLogin" element={<FormLogin />} />
      <Route path="/FormRegistration" element={<FormRegistration />} />
      <Route path="/LoadingPages" element={<LoadingPages />}></Route>
    </Routes>
  );
};

export default RoutesForm;
