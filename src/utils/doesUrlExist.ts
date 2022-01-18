import { IResourceAdd } from "../interfaces/IResource";
import { IResourceShort } from "../interfaces/IResource";

export default function doesUrlExist(
  allResources: IResourceShort[],
  addResource: IResourceAdd
): boolean {
  for (const resource of allResources) {
    const existingUrl = resource.url?.replace(/http[s]?:\/\//, "").replace("www.", "");
    const newUrl = addResource.url.replace(/http[s]?:\/\//, "").replace("www.", "");
    if (existingUrl === newUrl) {
      return true;
    }
  }
  return false;
}
