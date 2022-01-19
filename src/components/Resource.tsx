import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";
import { IResourceShort } from "../interfaces/IResource";
import { IUser } from "../interfaces/IUser";
import { unclickableTags } from "../utils/unclickableTags";
import { Link } from "react-router-dom";

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

  return (
    <div
      data-cy="resource-item"
      className="p-2 col-3 border border-dark border-1 m-1 rounded"
    >
      <Link to={`/resources/${props.resource.id}`}>
        <h3 data-cy="resource-header">{props.resource.resource_name}</h3>
      </Link>
      {props.user !== undefined && (
        <button onClick={handleAddToStudyList}>+</button>
      )}
      <div data-cy="tags" className="my-1">
        {props.resource.tags.map((tag) => unclickableTags(tag))}
      </div>
      <p>by {props.resource.author_name}</p>
      <h3>
        👍 {props.resource.likes} 👎 {props.resource.dislikes}
      </h3>
    </div>
  );
}
