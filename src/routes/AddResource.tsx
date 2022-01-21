import { useState } from "react";
import { IResourceAdd, IResourceShort } from "../interfaces/IResource";
import { IUser } from "../interfaces/IUser";
import { ITag } from "../interfaces/ITag";
import PageHeader from "../components/PageHeader";
import isObjectDefined from "../utils/isObjectDefined";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";
import doesUrlExist from "../utils/doesUrlExist";

export default function AddResource(props: {
  user: IUser;
  tags: ITag[];
  allUsers: IUser[];
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setAllResources: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
  allResources: IResourceShort[];
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

  function handleAddResource() {
    if (!doesUrlExist(props.allResources, resourceDetails)) {
      if (isObjectDefined(resourceDetails)) {
        try {
          axios
            .post(baseUrl + "/resources", resourceDetails)
            .then(() =>
              fetchData(baseUrl + "/resources", props.setAllResources)
            )
            .then(() => setResourceDetails(initialResource))
            .then(() => window.alert("submission successful"));
        } catch (err) {
          console.log(err);
        }
      } else {
        window.alert("please fill in all fields");
      }
    } else {
      window.alert("resource with this url has already been submitted");
    }
  }
  console.log(props.user);
  return (
    <div data-cy="add-a-resource">
      {console.log(props.user)}
      <PageHeader
        title={"Add a Resource"}
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
        setStudyList={props.setStudyList}
      />
      {props.user === undefined ? (
        <p>Please log in to add a resource.</p>
      ) : (
        <div className="d-flex justify-content-center mx-5">
          <form className="col-8">
            <div className="form-group my-1">
              <label htmlFor="resourceName">Resource name</label>
              <input
                className="form-control"
                value={resourceDetails.resource_name}
                id="resourceName"
                name="resource_name"
                onChange={(e) => changeResource(e)}
              ></input>
            </div>
            <div className="form-group my-1">
              <label htmlFor="authorName">Author name</label>
              <input
                className="form-control"
                value={resourceDetails.author_name}
                id="authorName"
                name="author_name"
                onChange={(e) => changeResource(e)}
              ></input>
            </div>
            <div className="form-group my-1">
              <label htmlFor="submittedBy">Submitted by</label>
              <input
                className="form-control"
                data-cy="username"
                disabled={true}
                placeholder={props.user && props.user.name}
              ></input>
            </div>
            <div data-cy="tags">
              <p>Tags:</p>
              {props.tags.map((tag) => (
                <button
                  className={
                    resourceDetails.tags.includes(tag)
                      ? "btn btn-primary me-2 btn-sm"
                      : "btn btn-outline-primary me-2 btn-sm"
                  }
                  type="button"
                  key={tag.id}
                  name="tags"
                  onClick={() => handleClickTag(tag)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            <div className="form-group my-1">
              <label htmlFor="contentType"> Content Type </label>
              <input
                value={resourceDetails.content_type}
                className="form-control"
                name="content_type"
                placeholder={"e.g. video, article, etc."}
                onChange={(e) => changeResource(e)}
              ></input>
            </div>
            <div data-cy="week-no">
              <label htmlFor="week no">Week number </label>
              <br />
              <select
                className="my-2"
                id="week no"
                name="week_no"
                onChange={(e) => changeResource(e)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="form-group my-1">
              <label htmlFor="url">URL</label>
              <input
                className="form-control"
                value={resourceDetails.url}
                name="url"
                placeholder={"e.g. csx.codesmith.io/units/callbacks"}
                onChange={(e) => changeResource(e)}
              ></input>
            </div>
            <div className="form-group my-1">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="e.g. Interactive JavaScript tutorials to learn about callbacks"
                value={resourceDetails.description}
                onChange={(e) => changeResource(e)}
              ></textarea>
            </div>
            <div className="form-group my-1">
              <label htmlFor="recStatus">
                Do you recommend this resource?{" "}
              </label>
              <br />
              <select
                className="my-2"
                name="rec_status"
                defaultValue={""}
                onChange={(e) => changeResource(e)}
              >
                {[
                  "👍 I recommend this resource after having used it",
                  "👎 I do not recommend this resource, having used it",
                  "🤷 I haven't used this resource but it looks promising",
                ].map((str) => (
                  <option key={str}>{str}</option>
                ))}
              </select>
            </div>
            <div className="form-group my-1">
              <label htmlFor="recMessage">
                What did you think of the resource?
              </label>
              <textarea
                id="recMessage"
                className="form-control"
                name="rec_message"
                placeholder="Let others know what you think about this resource..."
                value={resourceDetails.rec_message}
                onChange={(e) => changeResource(e)}
              ></textarea>
            </div>
            <br />
            <button
              data-cy="submit-new-resource"
              onClick={handleAddResource}
              type="button"
              className="btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
