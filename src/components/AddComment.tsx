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
      <form>
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
      </form>
      <button onClick={() => setLike(true)}>👍</button>
      <button onClick={() => setLike(false)}>👎</button>
      <button onClick={() => handleSubmit(comment, like)}>Submit</button>
    </>
  );
}
