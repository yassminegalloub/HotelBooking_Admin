import { Role } from "./Role";

export class User {
    id: number;
    username: string ;
    name: string ;
    email: string ;
    password: string ;
    roles :Role
}