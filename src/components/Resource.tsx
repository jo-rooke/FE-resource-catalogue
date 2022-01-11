import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";
import { IResourceShort } from "../interfaces/IResource";
import { IUser } from "../interfaces/IUser";

export default function Resource(props: {
  resource: IResourceShort;
  user: IUser | undefined;
  setAllResources: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  async function handleAddToStudyList() {
    if (props.user) {
      try {
        await axios
          .post(baseUrl + `/to-study-list/${props.user.id}`, {
            resourceId: props.resource.id,
          })
          .then(() => fetchData(baseUrl, props.setAllResources)); // CHANGE ME : want to actually reload the to study list for the user, not all the resources
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <h3>{props.resource.resource_name}</h3>
      {props.user && <button onClick={handleAddToStudyList}>+</button>}
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
