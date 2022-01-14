import { IComment } from "../interfaces/IComment";
import { IUser } from "../interfaces/IUser";

export function canUserComment(user: IUser, comments: IComment[]): boolean {
  for (const comment of comments) {
    if (comment.user_id === user.id) {
      return false;
    }
  }
  return true;
}
