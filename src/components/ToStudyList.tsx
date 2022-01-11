import { useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import { baseUrl } from "../utils/baseUrl";
import { IResourceShort } from "../interfaces/IResource";
import { IUser } from "../interfaces/IUser";
import { handleRemoveFromStudyList } from "../utils/handleRemoveFromStudyList";
import { unclickableTags } from "../utils/unclickableTags";

export default function ToStudyList(props: {
  user: IUser;
  studyList: IResourceShort[];
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  useEffect(() => {
    fetchData(baseUrl + `/to-study-list/${props.user.id}`, props.setStudyList);
  }, [props.user.id, props.setStudyList]);

  const StudyItem = (item: IResourceShort): JSX.Element => {
    return (
      <tr key={item.id}>
        <td>{item.resource_name}</td>
        <td>{item.tags.map((tag) => unclickableTags(tag))}</td>
        <td>{item.author_name}</td>
        <td>URL {item.id}</td>
        <td>
          <button
            onClick={() =>
              handleRemoveFromStudyList(
                props.user.id,
                item.id,
                props.setStudyList
              )
            }
          >
            Remove
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2>My To-Study List</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Resource name</th>
            <th scope="col">Tags</th>
            <th scope="col">Author name</th>
            <th scope="col">More details</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>{props.studyList.map((item) => StudyItem(item))}</tbody>
      </table>
    </div>
  );
}
