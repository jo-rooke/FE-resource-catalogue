import { IResourceShort } from "../interfaces/IResource"

export default function Resource(props: IResourceShort ): JSX.Element {
    return (
        <>
            <h3>{props.resource_name}</h3>
            {props.tags.map((tag) => (
                <p key={tag.id}>#{tag.name} </p>
            ))}

            <p>by {props.author_name}</p>
            <h3>👍</h3>{props.likes} <h3>👎</h3>{props.dislikes}
        </> 
        
    )
}
