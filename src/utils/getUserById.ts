import { IUser } from "../interfaces/IUser";

export function getUserById(userArr: IUser[], id: number): IUser {
  return userArr.filter((user) => user.id === id)[0];
}
