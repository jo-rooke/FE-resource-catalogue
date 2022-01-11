import React from "react";
import PageHeader from "../components/PageHeader";
import { IUser } from "../interfaces/IUser";
import ToStudyList from "../components/ToStudyList";

export default function Home(props: {
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
      />
      <div>Home Page</div>
      {props.user !== undefined && <ToStudyList user={props.user} />}
    </>
  );
}
