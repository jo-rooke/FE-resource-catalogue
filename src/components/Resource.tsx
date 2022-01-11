import { ResourceComponentProps } from "../interfaces/IResource";

export default function Resource(props: ResourceComponentProps): JSX.Element {
  function handleAddToStudyList() {
    console.log("clicked");
  }
  return (
    <>
      <h3>{props.resource_name}</h3>
      {props.user && <button onClick={handleAddToStudyList}>+</button>}
      {props.tags.map((tag) => (
        <p key={tag.id}>#{tag.name} </p>
      ))}
      <p>by {props.author_name}</p>
      <h3>👍</h3>
      {props.likes} <h3>👎</h3>
      {props.dislikes}
    </>
  );
}
