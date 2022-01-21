import { IResourceShort } from "../interfaces/IResource";
import { ITag } from "../interfaces/ITag";
import { useState } from "react";
import Resource from "./Resource";
import filterSearchAndTags from "../utils/filterSearchAndTags";
import filterOutStudyList from "../utils/filterOutStudyList";
import { IUser } from "../interfaces/IUser";
import { Link } from "react-router-dom";
import "../style.css";
import Okapi from "../img/okapi.jpg";

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
    <div data-cy="resource-list" className="p-3">
      <h2 className="mb-2">Resources</h2>

      <div data-cy="filtering-tags">
        <input
          className="my-2"
          placeholder={"search for resource"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <br />
        {props.tags.map((tag) => (
          <button
            type="button"
            className={
              tagsSelected.includes(tag)
                ? "btn btn-primary me-2 btn-sm"
                : "btn btn-outline-primary me-2 btn-sm"
            }
            key={tag.id}
            onClick={() => handleTagClick(tag)}
          >
            {tag.name}
          </button>
        ))}
        {props.user && (
          <Link to="/resources/add">
            <button
              type="button"
              className="my-2 btn btn-success"
              data-cy="add-resource-button"
            >
              Add a new resource
            </button>
          </Link>
        )}
      </div>
      <div className="grid-container">
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
        {/* </div> */}
      </div>
      <Link to="/" title="Return home" className="text-center">
        <img alt="An okapi" src={Okapi} width={60} />
      </Link>
    </div>
  );
}
