import { IResourceAdd } from "../interfaces/IResource";


export default function isObjectDefined(obj: IResourceAdd): boolean {
    for (const [key,value] of Object.entries(obj)) {
        if (!value && typeof key==="string") {
          return false;
        }
    }
    return true;
}