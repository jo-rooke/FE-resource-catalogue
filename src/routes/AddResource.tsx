import { useState } from "react";
import { IResourceAdd, IResourceShort } from "../interfaces/IResource";
import { IUser } from "../interfaces/IUser";
import { ITag } from "../interfaces/ITag";
import PageHeader from "../components/PageHeader";
import isObjectDefined from "../utils/isObjectDefined";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";

export default function AddResource(props: {
  user: IUser;
  tags: ITag[];
  allUsers: IUser[];
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setAllResources: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  const initialResource = {
    resource_name: "",
    author_name: "",
    tags: [],
    description: "",
    url: "",
    content_type: "",
    week_no: 0,
    recommender_id: props.user.id,
    rec_status: "",
    rec_message: "",
  };
  const [resourceDetails, setResourceDetails] =
    useState<IResourceAdd>(initialResource);

  console.log(resourceDetails);
  const changeResource = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let value;
    if (e.target.name === "week_no") {
      value = parseInt(e.target.value);
    } else {
      value = e.target.value;
    }

    setResourceDetails({ ...resourceDetails, [e.target.name]: value });
  };

  const handleClickTag = (tag: ITag) => {
    let tags = resourceDetails.tags;
    if (resourceDetails.tags.includes(tag)) {
      tags = tags.filter((item) => item !== tag);
    } else {
      tags = [...resourceDetails.tags, tag];
    }
    setResourceDetails({ ...resourceDetails, tags: tags });
  };

  async function handleAddResource() {
    if (isObjectDefined(resourceDetails)) {
      //fix function
      try {
        await axios
          .post(baseUrl + "/resources", resourceDetails)
          .then(() => fetchData(baseUrl + "/resources", props.setAllResources))
          .then(() => setResourceDetails(initialResource));
      } catch (err) {
        console.log(err);
      }
    } else {
      window.alert("please fill in all fields");
    }
  }

  console.log(resourceDetails);
  return (
    <>
      <PageHeader
        title={"Add a Resource"}
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
        setStudyList={props.setStudyList}
      />
      <input
        value={resourceDetails.resource_name}
        name="resource_name"
        placeholder={"Resource Name"}
        onChange={(e) => changeResource(e)}
      ></input>
      <input
        value={resourceDetails.author_name}
        name="author_name"
        placeholder={"Author Name"}
        onChange={(e) => changeResource(e)}
      ></input>
      <input
        disabled={true}
        placeholder={props.user && "user name: " + props.user.name}
      ></input>
      <p>Tags:</p>
      {props.tags.map((tag) => (
        <button key={tag.id} name="tags" onClick={() => handleClickTag(tag)}>
          {tag.name}
        </button>
      ))}
      <input
        value={resourceDetails.content_type}
        name="content_type"
        placeholder={"Content Type e.g. video, article etc."}
        onChange={(e) => changeResource(e)}
      ></input>
      <label htmlFor="week no">Week number: </label>
      <select id="week no" name="week_no" onChange={(e) => changeResource(e)}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        value={resourceDetails.url}
        name="url"
        placeholder={"URL"}
        onChange={(e) => changeResource(e)}
      ></input>
      <textarea
        rows={8}
        cols={50}
        value={resourceDetails.description}
        name="description"
        placeholder={"description"}
        onChange={(e) => changeResource(e)}
      ></textarea>
      <select
        name="rec_status"
        defaultValue={""}
        onChange={(e) => changeResource(e)}
      >
        <option value="" disabled>
          Do you recommend this resource?
        </option>
        {[
          "I recommend this resource after having used it",
          "I do not recommend this resource, having used it",
          "I haven't used this resource but it looks promising",
        ].map((str) => (
          <option key={str}>{str}</option>
        ))}
      </select>
      <textarea
        rows={4}
        cols={50}
        value={resourceDetails.rec_message}
        name="rec_message"
        placeholder={"What did you think of the resource?"}
        onChange={(e) => changeResource(e)}
      ></textarea>
      <button onClick={handleAddResource}>Submit</button>
    </>
  );
}
