import { ITag } from "./ITag";

export interface IResource {
  resource_name: string;
  author_name: string;
  tags: ITag[];
  description: string;
}

export interface IResourceShort extends IResource {
  // for GET /resources
  // for GET /to-study-list/{userId}
  id: number;
  creation_date?: string;
  likes?: number;
  dislikes?: number;
  url?: string;
}

export interface IResourceAdd extends IResource {
  // for POST /resources
  url: string;
  content_type: string;
  week_no: number;
  recommender_id: number;
  rec_status: string;
  rec_message: string;
}

export interface IResourceLong extends IResourceShort {
  // for GET /resources/:id
  content_type: string;
  week_no: number;
  recommender_id: number;
  rec_status: string;
  rec_message: string;
  name: string;
  is_faculty: boolean;
}
