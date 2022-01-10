import { IResourceShort } from "../interfaces/IResource";
import { ITag } from "../interfaces/ITag";
import { useState } from "react";
import Resource from "./Resource";


export default function ResourceList(props: { tags: ITag[], allResources: IResourceShort[]}): JSX.Element {
    const [search, setSearch] = useState("");
    const [tagsSelected, setTagsSelected] = useState<ITag[]>([]);

    // let filteredResources = props.allResources;
    // if (tagsSelected !== []) {
    //     filteredResources = props.allResources.filter((resource) => {
    //         for (const tag of tagsSelected) {
    //             return resource.tags.includes(tag)
    //         }
    
    //     })
    // }

    console.log(props.allResources)

    const handleTagClick = (tag: ITag) => {
        let newTags: ITag[] ;
        if (tagsSelected.includes(tag)) {
            newTags = tagsSelected.filter((element) => { return element !== tag });
        } else {
            newTags = [...tagsSelected, tag];
        }

        setTagsSelected(newTags);
    }

    console.log(tagsSelected);
    return (
        <>
        <h2>Recommendations</h2>
        {props.tags.map((tag) => (
            <button key={tag.id} onClick={() => handleTagClick(tag)}>{tag.name}</button>
        ))}
        <input placeholder={"search for resource"}value={search} onChange={(e) => setSearch(e.target.value)}></input>
        {/*filteredResources*/props.allResources.map((resource) => (
            <Resource
            key={resource.id}
            id={resource.id}
            resource_name={resource.resource_name}
            author_name={resource.author_name}
            tags={resource.tags}
            creation_date={resource.creation_date}
            likes={resource.likes}
            dislikes={resource.dislikes}

            />
        ))}
            
        </>
    )
}
