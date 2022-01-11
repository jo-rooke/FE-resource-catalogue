import React from "react";
import PageHeader from "../components/PageHeader";
import { IUser } from "../interfaces/IUser";
import ToStudyList from "../components/ToStudyList";
import { ITag } from "../interfaces/ITag";
import { IResourceShort } from "../interfaces/IResource";
import ResourceList from "../components/ResourceList";

export default function Home(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  tags: ITag[];
  allResources: IResourceShort[];
  setAllResources: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  return (
    <>
      <PageHeader
        title={"Study Catalogue"}
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
      />
      <ResourceList
        tags={props.tags}
        allResources={props.allResources}
        user={props.user}
        setAllResources={props.setAllResources}
      />
      <div>Home Page</div>
      {props.user !== undefined && <ToStudyList user={props.user} />}
    </>
  );
}
