import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IResourceLong, IResourceShort } from "../interfaces/IResource";
import { fetchData } from "../utils/fetchData";
import { baseUrl } from "../utils/baseUrl";
import { unclickableTags } from "../utils/unclickableTags";
import { IUser } from "../interfaces/IUser";
import PageHeader from "../components/PageHeader";
import { timestampFormatter } from "../utils/timestampFormatter";

export default function IndividualResource(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  studyList: IResourceShort[];
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  const { id } = useParams();
  const [resource, setResource] = useState<IResourceLong[]>([]);

  useEffect(() => {
    fetchData(baseUrl + `/resources/${id}`, setResource);
  }, [id]);

  return (
    <>
      <PageHeader
        title={"Individual Resource"}
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
      />
      {resource.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>{resource[0].resource_name}</h2>
          <h3>👍: {resource[0].likes}</h3>
          <h3>👎: {resource[0].dislikes}</h3>
          <h3>Author: {resource[0].author_name}</h3>
          <h3>Recommended by: {resource[0].name}</h3>
          {resource[0].creation_date !== undefined && (
            <h3>
              Creation date: {timestampFormatter(resource[0].creation_date)}
            </h3>
          )}
          <div>{resource[0].tags.map((tag) => unclickableTags(tag))}</div>
          <h3>Week number: {resource[0].week_no}</h3>
          <h3>Content type: {resource[0].content_type}</h3>
          <h3>
            <a href={resource[0].url} target="_blank" rel="noreferrer">
              Link to resource
            </a>
          </h3>
          <p>Description: {resource[0].description}</p>
        </div>
      )}
    </>
  );
}
