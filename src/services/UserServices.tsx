import axios from "axios";

import { AppDispatch } from "../redux/Store";
import { setUsers } from "../redux/slices/UsersSlices";

const UserServices = () => (dispatch: AppDispatch) => {
  const baseUrl = "https://randomuser.me/api/?results=1000";
  axios
    .get(baseUrl)
    .then((response) => {
      const users = response.data.results;
      dispatch(setUsers(users));
    })
    .catch((error) => console.log(error));
};

export default UserServices;
