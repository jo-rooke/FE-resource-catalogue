import { IComment } from "../interfaces/IComment";

export default function SingleComment(comment: IComment): JSX.Element {
  return (
    <div>
      <p>{comment.comment}</p>
      <p>{comment.name}</p>
      {comment.liked ? "👍" : "👎"}
    </div>
  );
}
