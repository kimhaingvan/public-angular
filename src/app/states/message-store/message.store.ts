import {GetItemsByPageRsp} from "../../models/resp";
import {Conversation, filter_page} from "../../models/app-models";
import {Injectable} from "@angular/core";
import {EntityStore, StoreConfig} from "@datorama/akita";

export interface MessageState {
  all_conversations: Array<Conversation>;
  active_conversation: Conversation,
  messages_list: any,
  message_list_view: GetItemsByPageRsp;
  filter_page: filter_page,
  active_conversation_id: Number
}

const initState = {
  all_conversations: [],
  active_conversation_id:1,
  messages_list : [],
  message_list_view : null,
  filter_page: {
    page: 0,
    per_page: 20,
  },
}
@Injectable({providedIn: 'root'})
@StoreConfig({name:'message'})
export class MessageStore extends EntityStore<MessageState>{
  constructor() {
    super(initState);
  }
}
