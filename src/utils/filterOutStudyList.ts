import { IResourceShort } from "../interfaces/IResource";

export default function filterOutStudyList(
  item: IResourceShort,
  studyList: IResourceShort[]
): boolean {
  if (studyList.length > 0) {
    for (const listItem of studyList) {
      if (listItem.id === item.id) {
        return false;
      }
    }
    return true;
  } else {
    return true;
  }
}
