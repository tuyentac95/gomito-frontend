import {GCard} from './gCard';

export class ListModel {
  listName?: string;
  listId?: number;
  boardId?: number;
  cards?: GCard[];
  listIndex?: number;
  dropListId?: number;
}
