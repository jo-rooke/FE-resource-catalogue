import { useState, useEffect } from "react";
import { IResourceAdd } from "../interfaces/IResource";
import { IUser } from "../interfaces/IUser";



export default function AddResource(props: { user: IUser | undefined}): JSX.Element {
  const [resourceDetails, setResourceDetails] = useState<IResourceAdd>({
    resource_name: "",
    author_name: "",
    tags: [],
    description: "",
    url: "",
    content_type: "",
    week_no: 0,
    recommender_id: 0,
    rec_status: "",
    rec_message: ""

  });

  useEffect(() => {
    if (props.user) {
      setResourceDetails({...resourceDetails, recommender_id: props.user.id})
    }
  }, [props.user, resourceDetails])

  const changeResource = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setResourceDetails({...resourceDetails, [e.target.name]: value})
  }

  return (
    <>
    <h1>Add a Resource</h1>
    <input value={resourceDetails.resource_name} name="resource_name" placeholder={"Resource Name"} onChange={(e) => changeResource(e)}></input>
    <input value={resourceDetails.author_name} name="author_name" placeholder={"Author Name"} onChange={(e) => changeResource(e)}></input>
    <input disabled={true} placeholder={props.user && props.user.name}></input>
    <p>Tags:</p>{/*finish me */}
    </>
  );
}
