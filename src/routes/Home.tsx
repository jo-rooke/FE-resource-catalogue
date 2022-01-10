import React from "react";
import PageHeader from "../components/PageHeader";
import { IUser } from "../interfaces/IUser";

export default function Home(props: {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
}): JSX.Element {
  return (
    <>
      <PageHeader
        title={"Study Catalogue"}
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
        loggedIn={props.loggedIn}
        setLoggedIn={props.setLoggedIn}
      />
      <div>Home Page</div>
    </>
  );
}
