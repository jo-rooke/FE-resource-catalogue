import React from "react";
import { IUser } from "../interfaces/IUser";
import LogIn from "./LogIn";
import { Link } from "react-router-dom";
import Okapi from "../img/okapi.jpg";

export default function PageHeader(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  title: string;
}): JSX.Element {
  return (
    <>
      <Link to="/" title="Return home">
        <img alt="An okapi" src={Okapi} width={60} />
      </Link>
      <h1>{props.title}</h1>
      <LogIn
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
      />
    </>
  );
}
