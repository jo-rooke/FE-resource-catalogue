import { IComment } from "../interfaces/IComment";

export default function SingleComment(comment: IComment): JSX.Element {
  return (
    <div className="d-flex align-items-center flex-wrap ">
      <p className="border rounded border-primary pb-5 px-2 col-8">
        {comment.comment}
      </p>
      <p className="p-2 col-2 text-center">{comment.name}</p>
      <h4 className="p-2 col-2">{comment.liked ? "👍" : "👎"}</h4>
    </div>
  );
}
