import { ITag } from "../interfaces/ITag";
import { IResourceShort } from "../interfaces/IResource";

export default function filterTags(
  selectedTags: ITag[],
  resource: IResourceShort
): boolean {
  for (const selectedTag of selectedTags) {
    if (resource.tags.some((tag) => tag.id === selectedTag.id)) {
      return true;
    }
  }
  return false;
}
