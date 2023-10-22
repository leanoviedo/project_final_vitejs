import { Dayjs } from "dayjs";

interface UserData {
  gender?: string;
  name: {
    title?: string;
    first: string;
    last: string;
  };
  location: {
    street?: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone?: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob?: {
    date: string;
    age: number;
  };
  registered?: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id?: {
    name: string;
    value: string;
  };
  picture: any;
  nat?: string | null;
}

interface LostObjectData {
  id: string;
  country: Country;
  city: City;
  airport: Airport;
  date: Dayjs | null;
  photo: string;
  description: string;
  type: string;
  status: string;
  userReport?: UserData | null;
  userReclamed?: UserData | null;
}

interface DataToReclaim {
  userReclamed: UserData;
  idLostObject: string;
}

interface Country {
  code: string;
  code3: string;
  name: string;
}

interface City {
  name: string;
  city_code: string;
  lat: number;
  lng: number;
  country_code: string;
  type: string;
}

interface Airport {
  name: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
  country_code: string;
}

interface UsersState {
  usersAvailable: UserData[];
}
interface RegistrationState {
  registeredUser: UserData[];
}
interface UserLoginState {
  loggedInUser: UserData | null;
}
interface LostObjectState {
  lostObjects: LostObjectData[];
}
interface Message {
  id: string;
  user: UserData;
  message: string;
  timestamp: number;
  image?: string;
  likes: number;
  likedBy: string[];
}

export type {
  UserData,
  RegistrationState,
  UsersState,
  UserLoginState,
  LostObjectData,
  LostObjectState,
  Country,
  City,
  Airport,
  Message,
  DataToReclaim,
};
