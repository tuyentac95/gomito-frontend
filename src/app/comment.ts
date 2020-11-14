import {GUser} from './user/GUser';

export class Comment {
  commentId?: number;
  cardId?: number;
  content?: string;
  guser?: GUser;
}
