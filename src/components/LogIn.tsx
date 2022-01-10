import React from "react";
import { IUser } from "../interfaces/IUser";

export default function LogIn(props: {
  allUsers: IUser[];
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <>
      {props.loggedIn && props.user !== undefined ? (
        <p>Hello, {props.user.name}</p>
      ) : (
        "LogInDropDown"
      )}
    </>
  );
}
