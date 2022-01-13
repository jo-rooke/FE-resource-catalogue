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
      <>
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
      </>
    );
  };

  return (
    <>
      {props.user !== undefined ? (
        <>
          <p>
            Hello, {props.user.name} {props.user.is_faculty ? "👨🏻‍🏫" : "👨‍🎓"}
          </p>
          <button
            onClick={() => {
              props.setUser(undefined);
              props.setStudyList([]);
            }}
          >
            Log out
          </button>
        </>
      ) : (
        <Dropdown />
      )}

      <hr />
    </>
  );
}
