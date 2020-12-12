import { WebSocketService } from 'src/app/services/web-socket.service';
import { AccountQuery } from 'src/app/states/account-store/account.query';
import { MessageService } from './../../../../../../states/message-store/message.service';
import { Component, OnInit, ElementRef, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { MessageQuery } from 'src/app/states/message-store/message.query';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-messages',
  templateUrl: './customer-messages.component.html',
  styleUrls: ['./customer-messages.component.scss']
})
export class CustomerMessagesComponent implements OnInit, OnDestroy {
  @ViewChild('mes',{static: false}) message: ElementRef;
  chatText =''
  is_loading = false;

  listen_message$: Subscription
  all_conversations$ = this.messageQuery.all_conversations$
  active_conversation$ = this.messageQuery.active_conversation$

  constructor(private messageService: MessageService, private messageQuery: MessageQuery, private accountQuery: AccountQuery, private webSocketService: WebSocketService) { }


  async ngOnInit() {
    await this.FetchConversations().then(_ => {
      this.webSocketService.emit('join', {'auth_info': JSON.parse(localStorage.getItem('auth_info')), 'room': this.messageQuery.getValue().active_conversation.conversation_id});
    });
    this.listen_message$ = this.webSocketService.listen('message').subscribe(async message => {
      await this.ListenMessage(message)
    })
  }

  ngOnDestroy() {
    this.listen_message$.unsubscribe()
  }

  async FetchConversations() {
    await this.messageService.GetAllConversations().then(async (_) => {
      this.messageService.SetActiveConversation(this.messageQuery.getValue().all_conversations[0])
      await this.messageService.GetMoreMessageAndPushIntoStoreAdmin({
        page:0,
        per_page:10,
        conversation_id: this.messageQuery.getValue().active_conversation.conversation_id
      })
    })
  }

  async SendMessage() {
    if(!this.chatText) {
      return;
    }
    const sendMessageReq = {
      conversation_id : this.messageQuery.getValue().active_conversation?.conversation_id,
      account_id : this.accountQuery.getValue().auth_info.current_account.account_id,
      content : this.chatText,
      room: this.messageQuery.getValue().active_conversation?.conversation_id,
    }
    this.webSocketService.emit('incoming-msg', sendMessageReq);
    this.chatText='';
  }

  async ListenMessage(message) {
    if(message) {
      let message_account_id_from_server = message['account_id'];
      let customer_account_id = this.messageQuery.getValue().active_conversation.account.account_id;
      const isReplyMessage = message_account_id_from_server == customer_account_id;

      message.type = isReplyMessage ? 'reply' : 'send';

      let store_all_conversations = this.messageQuery.getValue().all_conversations;
      let conversation_of_message = store_all_conversations.find(conv => message.conversation_id == conv.conversation_id)

      if(conversation_of_message) {
        conversation_of_message.updated_at = message.created_at;
        conversation_of_message.messages.push(message);
        conversation_of_message.last_message = message.content;

        if(conversation_of_message.conversation_id != this.messageQuery.getValue().active_conversation.conversation_id) {
          conversation_of_message.is_read = message.is_read
        } else {
          await this.messageService.ReadConversation(conversation_of_message.conversation_id)
        }

        const swap_conversation_of_message = {...conversation_of_message};

        let index = store_all_conversations.findIndex(conv => conversation_of_message['conversation_id']  == conv['conversation_id'])
        store_all_conversations.splice(index, 1)
        store_all_conversations.unshift(swap_conversation_of_message)
        // this.SetActiveConversation(swap_conversation_of_message)
      }

      this.messageService.UpdateAllConversations(store_all_conversations)
      this.MessageScrollToBottom()
    }
  }

  MessageScrollToBottom() {
    if(this.message) {
      this.message.nativeElement.scrollTop=this.message.nativeElement.scrollHeight;
    }
  }

  async SetActiveConversation(conversation?) {
    this.webSocketService.emit('join', {'auth_info': JSON.parse(localStorage.getItem('auth_info')), 'room': conversation.conversation_id});
    this.messageService.SetActiveConversation(conversation);

    if(!conversation.is_read) {
      await this.messageService.ReadConversation(conversation.conversation_id)
    }

    if(!this.messageQuery.getValue().active_conversation.messages || !this.messageQuery.getValue().active_conversation.messages.length) {
      await this.messageService.GetMoreMessageAndPushIntoStoreAdmin({
        page:0,
        per_page:10,
        conversation_id: this.messageQuery.getValue().active_conversation.conversation_id
      })
    }
  }

  get active_conversation() {
    return this.messageQuery.getValue().active_conversation
  }

  async LoadMoreMessages(active_conversation) {
    this.is_loading = true;
    try {
      const req = {
        page: active_conversation.current_page - 1,
        per_page: 10,
        conversation_id: active_conversation.conversation_id
      }
      await this.messageService.GetMoreMessageAndPushIntoStoreAdmin(req)
    } catch(e) {
      toastr.error("Tải tin nhắn thất bại!", e.msg || e.message)
      this.is_loading = false;
    }
    this.is_loading = false;
  }
}
