import React from "react";
import { IUser } from "../interfaces/IUser";
import { getUserById } from "../utils/getUserById";
import { IResourceShort } from "../interfaces/IResource";

export default function LogIn(props: {
  allUsers: IUser[];
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  const Dropdown = (): JSX.Element => {
    return (
      <div data-cy="user-dropdown">
        <label>Login: </label>
        <select
          id="login"
          defaultValue={""}
          className="mx-1"
          onChange={(e) => {
            props.setUser(
              getUserById(props.allUsers, parseInt(e.target.value))
            );
            localStorage.setItem("userId", e.target.value);
          }}
        >
          <option value="" disabled>
            Please select your name
          </option>
          {props.allUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div data-cy="login">
      {props.user !== undefined ? (
        <div className="d-flex justify-content-between align-items-center">
          <p className="col align-items-end" data-cy="greetings">
            Hello, {props.user.name} {props.user.is_faculty ? "👨🏻‍🏫" : "👨‍🎓"}
          </p>
          <button
            type="button"
            className="btn btn-danger btn-sm col align-items-center"
            onClick={() => {
              props.setUser(undefined);
              props.setStudyList([]);
              localStorage.removeItem("userId");
            }}
            data-cy="logout-button"
          >
            Log out
          </button>
        </div>
      ) : (
        <Dropdown />
      )}
    </div>
  );
}
