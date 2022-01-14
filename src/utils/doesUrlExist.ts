import { IResourceAdd } from "../interfaces/IResource";
import { IResourceShort } from "../interfaces/IResource";

export default function doesUrlExist(
  allResources: IResourceShort[],
  addResource: IResourceAdd
): boolean {
  for (const resource of allResources) {
    if (resource.url === addResource.url) {
      return true;
    }
  }
  return false;
}
