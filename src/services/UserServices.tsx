import axios from "axios";
import { setUsers } from "../redux/slices/UsersSlices";
import { AppDispatch } from "../redux/Store";

const UserServices = () => (dispatch: AppDispatch) => {
  const baseUrl = "https://randomuser.me/api/?results=1000"
  axios
    .get(baseUrl)
    .then((response) => {
      const users = response.data.results
      dispatch(setUsers(users));
    })
    .catch((error) => console.log(error));
};

export default UserServices;
