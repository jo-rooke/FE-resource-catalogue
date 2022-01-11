import React from "react";
import PageHeader from "../components/PageHeader";
import { IUser } from "../interfaces/IUser";
import { ITag } from "../interfaces/ITag";
import { IResourceShort } from "../interfaces/IResource";
import ResourceList from "../components/ResourceList";

export default function Home(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  tags: ITag[];
  allResources: IResourceShort[];
}): JSX.Element {
  return (
    <>
      <PageHeader
        title={"Study Catalogue"}
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
      />
      <ResourceList tags={props.tags} allResources={props.allResources} />
      <div>Home Page</div>
    </>
  );
}
