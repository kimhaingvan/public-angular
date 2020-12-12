import { Message } from 'src/app/models/app-models';
import { account, Conversation } from './../../models/app-models';
import {Injectable} from "@angular/core";
import {ApiMessageService} from "../../API/api-message.service";
import {MessageStore} from "./message.store";
import {MessageQuery} from "./message.query";
import {GetItemsByPageRsp} from "../../models/resp";
import {AccountQuery} from "../account-store/account.query";
import {AccountStore} from "../account-store/account.store";
import {AccountService} from "../account-store/account.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private apiMessageService:ApiMessageService,
              private messageStore: MessageStore,
              private messageQuery: MessageQuery,
              private accountQuery: AccountQuery,
  ) {
  }

  async GetMoreMessageAndPushIntoStore(filter) {
    let res: GetItemsByPageRsp = await this.apiMessageService.GetMessages(filter);
    let new_messages = res.items;
    let account_id_from_client = this.accountQuery.getValue().auth_info.current_account.account_id;

    new_messages.forEach( mess => {
      if(mess.account_id == account_id_from_client) {
        mess.type = 'send'
      } else {
        mess.type = 'reply'
      }
    })

    let messages_list = [...this.messageQuery.getValue().messages_list];
    messages_list.push(...new_messages)
    this.messageStore.update({messages_list: messages_list})
  }

  async GetMoreMessageAndPushIntoStoreAdmin(filter) {
    let res: GetItemsByPageRsp = await this.apiMessageService.GetMessages(filter);
    let new_messages: Message[] = res.items;

    new_messages.forEach( mess => {
      if(this.messageQuery.getValue().active_conversation.customer_account_id == mess.account_id) {
        mess.type = 'reply'
      } else {
        mess.type = 'send'
      }
    })
    let all_conversations = this.messageQuery.getValue()?.all_conversations;
    let active_conversation: Conversation = all_conversations.find(conv => conv.conversation_id == this.messageQuery.getValue()?.active_conversation.conversation_id);
    active_conversation.current_page = res.current_page;
    if(active_conversation.messages && active_conversation.messages.length) {
      active_conversation.messages.unshift(...new_messages);
    } else {
      active_conversation.messages = new_messages;
    }

    this.messageStore.update({all_conversations: all_conversations});
  }

  async SendMessage(content) {
    const sendMessageReq = {
      conversation_id : this.messageQuery.getValue().active_conversation_id,
      account_id : this.accountQuery.getValue().auth_info.current_account.account_id,
      content : content,
    }
    return await this.apiMessageService.SendMessage(sendMessageReq);
  }

  SetActiveConversationId(conversation_id) {
    this.messageStore.update({active_conversation_id: conversation_id})
  }

  async GetConversationByCustomerAccountId(req) {
    return await this.apiMessageService.GetConversationByCustomerAccountId(req);
  }

  async GetAllConversations() {
    let all_conversations = await this.apiMessageService.GetAllConversations();
    this.messageStore.update({all_conversations: all_conversations})
  }

  SetActiveConversation(conversation) {
    this.messageStore.update({active_conversation: conversation})
  }

  UpdateAllConversations(all_conversations: Conversation[]) {
    this.messageStore.update({all_conversations: all_conversations})
  }

  async ReadConversation(conversation_id) {
    let res = await this.apiMessageService.ReadConversation(conversation_id)
    if(res['is_success']) {
      let all_conversations =  this.messageQuery.getValue().all_conversations
      let active_conversation = all_conversations.find(conv => conv.conversation_id == conversation_id)
      active_conversation.is_read = true
      this.messageStore.update({all_conversations: all_conversations})
    }
  }
}
