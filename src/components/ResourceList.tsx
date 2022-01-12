import { IResourceShort } from "../interfaces/IResource";
import { ITag } from "../interfaces/ITag";
import { useState } from "react";
import Resource from "./Resource";
import filterTags from "../utils/filterTags";
import filterSearch from "../utils/filterSearch";
import { IUser } from "../interfaces/IUser";

export default function ResourceList(props: {
  tags: ITag[];
  allResources: IResourceShort[];
  user: IUser | undefined;
  setAllResources: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
  studyList: IResourceShort[];
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  const [search, setSearch] = useState("");
  const [tagsSelected, setTagsSelected] = useState<ITag[]>([]);

  let filteredResources: IResourceShort[] = props.allResources;

  //filtering out resources that are already in the study list
  let arrayToFilter;
  if (props.studyList.length > 0) {
    arrayToFilter = props.allResources.filter((singleResource) => {
      for (const listItem of props.studyList) {
        console.log(listItem.id, "list item id");
        console.log(singleResource.id, "single resource id");
        if (listItem.id === singleResource.id) {
          return false;
        }
      }
      return true;
    });
  } else {
    arrayToFilter = props.allResources;
  }

  if (tagsSelected.length !== 0 && search.length === 0) {
    //filtering for tags only
    filteredResources = arrayToFilter.filter((singleResource) =>
      filterTags(tagsSelected, singleResource)
    );
  } else if (tagsSelected.length === 0 && search.length !== 0) {
    //filtering for search term only
    filteredResources = arrayToFilter.filter((resource) =>
      filterSearch(search, resource)
    );
  } else if (tagsSelected.length !== 0 && search.length !== 0) {
    //filtering for both tags and search term
    const filteredTags = arrayToFilter.filter((resource) =>
      filterTags(tagsSelected, resource)
    );
    filteredResources = filteredTags.filter((resource) =>
      filterSearch(search, resource)
    );
  } else {
    filteredResources = arrayToFilter;
  }

  const handleTagClick = (tag: ITag) => {
    let newTags: ITag[];
    if (tagsSelected.includes(tag)) {
      newTags = tagsSelected.filter((element) => {
        return element !== tag;
      });
    } else {
      newTags = [...tagsSelected, tag];
    }

    setTagsSelected(newTags);
  };
  return (
    <>
      <h2>Recommendations</h2>

      {props.tags.map((tag) => (
        <button key={tag.id} onClick={() => handleTagClick(tag)}>
          {tag.name}
        </button>
      ))}
      <input
        placeholder={"search for resource"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      {props.user && <button>Add a new resource</button>}
      {filteredResources.map((resource) => (
        <Resource
          key={resource.id}
          resource={resource}
          user={props.user}
          setAllResources={props.setAllResources}
          studyList={props.studyList}
          setStudyList={props.setStudyList}
        />
      ))}
    </>
  );
}
