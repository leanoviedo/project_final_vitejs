import { Dayjs } from "dayjs";

interface UserData {
    picture: any;
    name: any;
    email: string;
    first: string;
    last: string;
    phone: string;
    password: string;
    login: any;
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


interface Location {
    name: string;
    code: string;
}

interface LostObjectData {
    country: Location;
    city: Location;
    airport: Location;
    date: Dayjs | null;
    description: string;
    photo?: string;
    user: {
        name: {
            first: string;
            last: string;
        }
        picture: any;
        email: string;
        phone: string;
        password: string;
        login: any;
    }
}
interface LostObjectState {
    lostObjects: LostObjectData[];
}

interface LostObject {
    country: string;
    city: string;
    airport: string;
    description: string;
    date: Dayjs | null;
    photo?: string;
}

export type { UserData, RegistrationState, UsersState, UserLoginState, LostObjectData, LostObjectState, LostObject, }

