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
          // placeholder="Select your name"
          onChange={(e) =>
            props.setUser(getUserById(props.allUsers, parseInt(e.target.value)))
          }
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
        <>
          <p data-cy="greetings">
            Hello, {props.user.name} {props.user.is_faculty ? "👨🏻‍🏫" : "👨‍🎓"}
          </p>
          <button
            onClick={() => {
              props.setUser(undefined);
              props.setStudyList([]);
            }}
            data-cy="logout-button"
          >
            Log out
          </button>
        </>
      ) : (
        <Dropdown />
      )}

      <hr />
    </div>
  );
}
