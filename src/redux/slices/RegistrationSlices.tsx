import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { UserData, RegistrationState } from "../../model/interface";


const usersDataExaple: UserData[] = [
  {
    gender: "female",
    name: {
      title: "Mrs",
      first: "José",
      last: "Ruiz",
    },
    location: {
      street: {
        number: 9838,
        name: "Calle del Prado",
      },
      city: "Palma de Mallorca",
      state: "País Vasco",
      country: "Spain",
      postcode: 48035,
      coordinates: {
        latitude: "-33.8712",
        longitude: "49.7296",
      },
      timezone: {
        offset: "-1:00",
        description: "Azores, Cape Verde Islands",
      },
    },
    email: "jose.ruiz@example.com",
    login: {
      uuid: "7d76fdae-6f5a-4a8d-9188-22704752f918",
      username: "orangedog250",
      password: "asd",
      salt: "8xPOHYZg",
      md5: "0e61434807b0674b2fed07039533a8a7",
      sha1: "853d9eadedf1c0c3cd477a3650d9321674472cba",
      sha256:
        "75e7552f3a8bf456384d397fa03871489bd15e5da79d37fb72711208c2c91b44",
    },
    dob: {
      date: "1972-11-27T16:10:32.256Z",
      age: 50,
    },
    registered: {
      date: "2002-11-04T01:26:15.010Z",
      age: 20,
    },
    phone: "943-196-058",
    cell: "608-088-197",
    id: {
      name: "DNI",
      value: "61967985-W",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/26.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/26.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/26.jpg",
    },
    nat: "ES",
  },
  {
    gender: "female",
    name: {
      title: "Mrs",
      first: "Willie",
      last: "Fleming",
    },
    location: {
      street: {
        number: 7940,
        name: "Brown Terrace",
      },
      city: "Orange",
      state: "New South Wales",
      country: "Australia",
      postcode: 2962,
      coordinates: {
        latitude: "86.7526",
        longitude: "-110.1728",
      },
      timezone: {
        offset: "+3:30",
        description: "Tehran",
      },
    },
    email: "willie.fleming@example.com",
    login: {
      uuid: "23e708f3-736c-42f1-8f3b-de55010badb3",
      username: "brownmeercat338",
      password: "124038",
      salt: "pDUJUtzF",
      md5: "d0dc58986d422b83ad840b687d23ba92",
      sha1: "1000985f86caacc1dcf19a8e928a044d0ac93eaa",
      sha256:
        "d21db6bb7f915d40fb4c94e5ff866c0815fd27331976dcf6578f9381e5552ab5",
    },
    dob: {
      date: "1991-09-24T17:29:38.740Z",
      age: 32,
    },
    registered: {
      date: "2004-05-31T08:09:32.492Z",
      age: 19,
    },
    phone: "08-8202-3898",
    cell: "0418-968-565",
    id: {
      name: "TFN",
      value: "424118601",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/25.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/25.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/25.jpg",
    },
    nat: "AU",
  },
  {
    gender: "female",
    name: {
      title: "Ms",
      first: "Aishwarya",
      last: "Sullad",
    },
    location: {
      street: {
        number: 3431,
        name: "Mall Rd",
      },
      city: "Deoghar",
      state: "Telangana",
      country: "India",
      postcode: 37658,
      coordinates: {
        latitude: "86.3127",
        longitude: "56.3121",
      },
      timezone: {
        offset: "-6:00",
        description: "Central Time (US & Canada), Mexico City",
      },
    },
    email: "aishwarya.sullad@example.com",
    login: {
      uuid: "e29f384f-2d32-4aed-96f0-2dba2b37d0fa",
      username: "ticklishleopard926",
      password: "1125",
      salt: "mMcTUZe1",
      md5: "330f73ad40fc884cf035e40e40e99f67",
      sha1: "e410dc2a9e6509440a21557dc325154c316a591e",
      sha256:
        "895b62f24e01ecb78ecad5170044487bc9ff3985988c879f3447677487d93014",
    },
    dob: {
      date: "1989-03-20T04:49:07.142Z",
      age: 34,
    },
    registered: {
      date: "2002-09-22T17:04:29.930Z",
      age: 21,
    },
    phone: "8412040074",
    cell: "8609087817",
    id: {
      name: "UIDAI",
      value: "157760764142",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/38.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/38.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/38.jpg",
    },
    nat: "IN",
  },
];

const initialState: RegistrationState = {
  registeredUser: usersDataExaple,
};

export const RegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.registeredUser.push(action.payload);
    },
  },
});

export const { addUser } = RegistrationSlice.actions;

export const selectRegistrationData = (state: RootState) =>
  state.registration.registeredUser;

export default RegistrationSlice.reducer;