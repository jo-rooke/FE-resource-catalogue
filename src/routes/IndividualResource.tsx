import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IResourceLong, IResourceShort } from "../interfaces/IResource";
import { fetchData } from "../utils/fetchData";
import { baseUrl } from "../utils/baseUrl";
import { unclickableTags } from "../utils/unclickableTags";
import { IUser } from "../interfaces/IUser";
import PageHeader from "../components/PageHeader";
import { timestampFormatter } from "../utils/timestampFormatter";
import { IComment } from "../interfaces/IComment";
import SingleComment from "../components/SingleComment";
import AddComment from "../components/AddComment";
import { canUserComment } from "../utils/canUserComment";

export default function IndividualResource(props: {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  allUsers: IUser[];
  studyList: IResourceShort[];
  setStudyList: React.Dispatch<React.SetStateAction<IResourceShort[]>>;
}): JSX.Element {
  const { id } = useParams();
  const [resource, setResource] = useState<IResourceLong[]>([]);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    fetchData(baseUrl + `/resources/${id}`, setResource);
    fetchData(baseUrl + `/comments/${id}`, setComments);
  }, [id]);

  return (
    <div data-cy="individual-resource">
      <PageHeader
        title={"Individual Resource"}
        allUsers={props.allUsers}
        user={props.user}
        setUser={props.setUser}
        setStudyList={props.setStudyList}
      />
      {resource.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>{resource[0].resource_name}</h2>
          <h4>
            👍 {resource[0].likes} 👎 {resource[0].dislikes}
          </h4>
          <p>Author: {resource[0].author_name}</p>
          <p>Recommended by: {resource[0].name}</p>
          {resource[0].creation_date !== undefined && (
            <p>
              Creation date: {timestampFormatter(resource[0].creation_date)}
            </p>
          )}
          <div>{resource[0].tags.map((tag) => unclickableTags(tag))}</div>
          <p>Week number: {resource[0].week_no}</p>
          <p>Content type: {resource[0].content_type}</p>
          <p>
            <a href={resource[0].url} target="_blank" rel="noreferrer">
              Link to resource
            </a>
          </p>
          <p>Description: {resource[0].description}</p>
          <hr />
          <h2> Comments </h2>
          {props.user === undefined ? (
            <p>Please log in to comment.</p>
          ) : id && canUserComment(props.user, comments) ? (
            <AddComment
              userId={props.user.id}
              resourceId={parseInt(id)}
              setComments={setComments}
              setResource={setResource}
            />
          ) : (
            <p>You have already added a comment.</p>
          )}
          <br />
          {comments.map((item) => SingleComment(item))}
        </div>
      )}
    </div>
  );
}
