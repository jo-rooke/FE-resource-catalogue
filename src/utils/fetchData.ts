import { IResourceShort, IResourceLong } from "../interfaces/IResource";
import { ITag } from "../interfaces/ITag";
import { IUser } from "../interfaces/IUser";

export function fetchData(
  url: string,
  setState:
    | React.Dispatch<React.SetStateAction<IResourceShort[]>>
    | React.Dispatch<React.SetStateAction<IUser[]>>
    | React.Dispatch<React.SetStateAction<ITag[]>>
    | React.Dispatch<React.SetStateAction<IResourceLong[]>>
): void {
  fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => setState(jsonBody.data));
}
