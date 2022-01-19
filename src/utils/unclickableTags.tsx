import { ITag } from "../interfaces/ITag";

export function unclickableTags(tag: ITag): JSX.Element {
  return (
    <button
      key={tag.id}
      type="button"
      className="btn btn-outline-dark btn-sm me-2"
      disabled
      name={tag.name}
    >
      {tag.name}
    </button>
  );
}
