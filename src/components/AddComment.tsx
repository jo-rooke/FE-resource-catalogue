import { useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { fetchData } from "../utils/fetchData";
import { IComment } from "../interfaces/IComment";
import { IResourceLong } from "../interfaces/IResource";
import axios from "axios";

export default function AddComment(props: {
  userId: number;
  resourceId: number;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  setResource: React.Dispatch<React.SetStateAction<IResourceLong[]>>;
}): JSX.Element {
  const [comment, setComment] = useState<string>("");
  const [like, setLike] = useState<boolean | undefined>(undefined);
  const handleSubmit = (comment: string, like: boolean | undefined): void => {
    if (typeof like === "undefined") {
      alert("Please give a like or a dislike.");
    } else if (!comment) {
      alert("Please insert a comment.");
    } else {
      axios
        .post(baseUrl + `/comments/${props.resourceId}`, {
          userId: props.userId,
          liked: like,
          comment: comment,
        })
        .then(() => {
          fetchData(
            baseUrl + `/comments/${props.resourceId}`,
            props.setComments
          );
          fetchData(
            baseUrl + `/resources/${props.resourceId}`,
            props.setResource
          );
          setLike(undefined);
          setComment("");
        });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <form>
          <label htmlFor="comment" className="me-2">
            Add a comment{" "}
          </label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </form>
        <button
          className={
            like === true
              ? "btn btn-outline-warning mx-2 align-items-center"
              : "btn mx-2 align-items-center"
          }
          onClick={() => setLike(true)}
        >
          <h4> 👍 </h4>
        </button>
        <button
          className={
            like === false
              ? "btn btn-outline-warning me-2 align-items-center"
              : "btn me-2 align-items-center"
          }
          onClick={() => setLike(false)}
        >
          <h4> 👎</h4>
        </button>
        <button
          className="btn btn-success me-2"
          onClick={() => handleSubmit(comment, like)}
        >
          Submit
        </button>
      </div>
    </>
  );
}
