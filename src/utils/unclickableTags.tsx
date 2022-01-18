import { ITag } from "../interfaces/ITag";

export function unclickableTags(tag: ITag): JSX.Element {
  return (
    <button key={tag.id} disabled name={tag.name}>
      {tag.name}
    </button>
  );
}
