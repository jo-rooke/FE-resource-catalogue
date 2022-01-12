import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";
import { IResourceShort } from "../interfaces/IResource";
import { IUser } from "../interfaces/IUser";

export default function Resource(props: {
  resource: IResourceShort;
  user: IUser | undefined;
  setAllResources: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
  studyList: IResourceShort[];
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  async function handleAddToStudyList() {
    if (props.user !== undefined) {
      const userId = props.user.id;
      try {
        await axios
          .post(baseUrl + `/to-study-list/${userId}`, {
            resourceId: props.resource.id,
          })
          .then(() =>
            fetchData(baseUrl + `/to-study-list/${userId}`, props.setStudyList)
          );
      } catch (err) {
        console.log(err);
      }
    }
  }
  console.log(props.studyList, props.resource);

  return (
    <>
      <h3>{props.resource.resource_name}</h3>
      {props.user !== undefined && (
        <button onClick={handleAddToStudyList}>+</button>
      )}
      {props.resource.tags.map((tag) => (
        <p key={tag.id}>#{tag.name} </p>
      ))}
      <p>by {props.resource.author_name}</p>
      <h3>👍</h3>
      {props.resource.likes} <h3>👎</h3>
      {props.resource.dislikes}
    </>
  );
}
