import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {MessageState, MessageStore} from "./message.store";

@Injectable({
  providedIn: 'root',
})
export class MessageQuery extends Query<MessageState> {
  constructor(protected store: MessageStore) {
    super(store);
  }

  messages_list$ = this.select('messages_list')
  all_conversations$ = this.select('all_conversations')
  active_conversation$ = this.select('active_conversation')
}
