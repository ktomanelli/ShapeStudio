import { User } from "./User";

export type SignInResponse = {
    user: User;
    token: string;
    message?: string;
}