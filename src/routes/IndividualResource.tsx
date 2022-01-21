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
        <div className="p-3">
          <h2 className="my-3">{resource[0].resource_name}</h2>
          <h4 className="my-3">
            👍 {resource[0].likes} 👎 {resource[0].dislikes}
          </h4>
          <h4 className="my-3">
            <a href={resource[0].url} target="_blank" rel="noreferrer">
              Link to resource
            </a>
          </h4>
          <div className="row">
            <p className="col-sm-2">Author:</p>
            <p className="col-sm-10">{resource[0].author_name}</p>
            <p className="col-sm-2">Recommended by:</p>
            <p className="col-sm-10">{resource[0].name}</p>
            {resource[0].creation_date !== undefined && (
              <>
                <p className="col-sm-2">Creation date:</p>
                <p className="col-sm-10">
                  {timestampFormatter(resource[0].creation_date)}
                </p>
              </>
            )}
            <p className="col-sm-2">Tags:</p>
            <p className="col-sm-10">
              {resource[0].tags.map((tag) => unclickableTags(tag))}
            </p>
            <p className="col-sm-2">Week number:</p>
            <p className="col-sm-10">{resource[0].week_no}</p>
            <p className="col-sm-2">Content type:</p>
            <p className="col-sm-10">{resource[0].content_type}</p>

            <p className="col-sm-2">Description:</p>
            <p className="col-sm-10">{resource[0].description}</p>
          </div>
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
          <div>{comments.map((item) => SingleComment(item))}</div>
        </div>
      )}
    </div>
  );
}
