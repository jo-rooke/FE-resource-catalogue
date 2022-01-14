import { IResourceShort } from "../interfaces/IResource";
import { ITag } from "../interfaces/ITag";
import filterTags from "./filterTags";
import filterSearch from "./filterSearch";

export default function filterSearchAndTags(
  item: IResourceShort,
  tagsSelected: ITag[],
  searchTerm: string
): boolean {
  if (tagsSelected.length !== 0 && searchTerm.length === 0) {
    //filtering for tags only
    return filterTags(tagsSelected, item);
  } else if (tagsSelected.length === 0 && searchTerm.length !== 0) {
    //filtering for search term only
    return filterSearch(searchTerm, item);
  } else if (tagsSelected.length !== 0 && searchTerm.length !== 0) {
    //filtering for both tags and search term
    return filterTags(tagsSelected, item) && filterSearch(searchTerm, item);
  } else {
    return true;
  }
}
