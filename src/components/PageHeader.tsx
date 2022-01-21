import React from "react";
import { IUser } from "../interfaces/IUser";
import LogIn from "./LogIn";
import { Link } from "react-router-dom";
import { IResourceShort } from "../interfaces/IResource";

export default function PageHeader(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  title: string;
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  return (
    <div data-cy="page-header" className="bg-success text-white mb-3">
      <div className="container-fluid align-items-center">
        <div className="row justify-content-around p-3">
          <div className="col-5 text-center">
            <h1>{props.title}</h1>
          </div>
          <div className="col-4 my-auto text-center">
            <LogIn
              allUsers={props.allUsers}
              user={props.user}
              setUser={props.setUser}
              setStudyList={props.setStudyList}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4 text-center text-white">
            <Link to="/" title="Return to home page" className="link-light">
              <p className="text-white">Home</p>
            </Link>
          </div>
          <div className="col-4 text-center">
            <Link
              to="/resources/add"
              title="Go to add a resource"
              className="link-light"
            >
              <p>Add resource</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
