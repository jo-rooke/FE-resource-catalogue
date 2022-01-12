import { IResourceShort } from "../interfaces/IResource";
import { ITag } from "../interfaces/ITag";
import { useState } from "react";
import Resource from "./Resource";
import filterSearchAndTags from "../utils/filterSearchAndTags";
import filterOutStudyList from "../utils/filterOutStudyList";
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
      {props.allResources
        .filter((item) => filterOutStudyList(item, props.studyList))
        .filter((item) => filterSearchAndTags(item, tagsSelected, search))
        .map((resource) => (
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
