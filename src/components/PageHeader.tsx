import React from "react";
import { IUser } from "../interfaces/IUser";
import LogIn from "./LogIn";

export default function PageHeader(props: {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  title: string;
}): JSX.Element {
  return (
    <>
      <h1>{props.title}</h1>
      <LogIn
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
        loggedIn={props.loggedIn}
        setLoggedIn={props.setLoggedIn}
      />
    </>
  );
}
