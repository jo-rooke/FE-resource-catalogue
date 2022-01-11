import { IResourceShort } from "../interfaces/IResource";
import { ITag } from "../interfaces/ITag";
import { useState } from "react";
import Resource from "./Resource";
import filterTags from "../utils/filterTags";
import filterSearch from "../utils/filterSearch";

export default function ResourceList(props: {
  tags: ITag[];
  allResources: IResourceShort[];
}): JSX.Element {
  const [search, setSearch] = useState("");
  const [tagsSelected, setTagsSelected] = useState<ITag[]>([]);

  let filteredResources: IResourceShort[] = props.allResources;
  //filtering for tags only
  if (tagsSelected.length !== 0 && search.length === 0) {
    filteredResources = props.allResources.filter((singleResource) =>
      filterTags(tagsSelected, singleResource)
    );
  } else if (tagsSelected.length === 0 && search.length !== 0) {
    //filtering for search term only
    filteredResources = props.allResources.filter((resource) =>
      filterSearch(search, resource)
    );
  } else if (tagsSelected.length !== 0 && search.length !== 0) {
    //filtering for both tags and search term
    const filteredTags = props.allResources.filter((resource) =>
      filterTags(tagsSelected, resource)
    );
    filteredResources = filteredTags.filter((resource) =>
      filterSearch(search, resource)
    );
  }

  // console.log(props.allResources)

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

  // console.log(tagsSelected);
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
      {filteredResources.map((resource) => (
        <Resource
          key={resource.id}
          id={resource.id}
          resource_name={resource.resource_name}
          author_name={resource.author_name}
          description={resource.description}
          tags={resource.tags}
          creation_date={resource.creation_date}
          likes={resource.likes}
          dislikes={resource.dislikes}
        />
      ))}
    </>
  );
}
