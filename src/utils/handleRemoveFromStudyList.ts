import { baseUrl } from "./baseUrl";
import { IResourceShort } from "../interfaces/IResource";
import { fetchData } from "./fetchData";

export function handleRemoveFromStudyList(
  userId: number,
  resourceId: number,
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>
): void {
  fetch(baseUrl + `/to-study-list/${userId}/${resourceId}`, {
    method: "DELETE",
  }).then(() => {
    fetchData(baseUrl + `/to-study-list/${userId}`, setStudyList);
  });
}
