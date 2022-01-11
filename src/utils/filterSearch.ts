import { IResourceShort } from "../interfaces/IResource";

export default function filterSearch(
  searchTerm: string,
  resource: IResourceShort
): boolean {
  return (
    resource.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some((tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}
