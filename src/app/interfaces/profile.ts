import { Image } from "./image";

export interface Profile {
    usersId: number;
    userName: String;
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    isActive: Boolean;
    profileImage?: Image;
}