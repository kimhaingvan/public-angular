import { account } from './../../models/app-models';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import * as io from 'socket.io-client';
import { Message } from 'src/app/models/app-models';
import { AccountQuery } from 'src/app/states/account-store/account.query';
import {MessageStore} from "../../states/message-store/message.store";
import {MessageQuery} from "../../states/message-store/message.query";
import {MessageService} from "../../states/message-store/message.service";
@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.scss']
})
export class BookStoreComponent implements OnInit {
  @ViewChild('mes',{static: false}) message: ElementRef;
  isDisplayMessage = false;

  messages : any[] =[];
  message_list$ = this.messageQuery.messages_list$
  constructor(private webSocketService: WebSocketService, private accountQuery:AccountQuery, private messageStore: MessageStore, private messageQuery: MessageQuery, private messageService: MessageService) { }
  chatText = ''
  async ngOnInit() {
    if(this.accountQuery.getValue().auth_info?.current_account.role.role_id == 3 && this.accountQuery.getValue().auth_info.current_account.role.role_name == "customer") {
      let req = {
        'customer_account_id': this.accountQuery.getValue().auth_info.current_account.account_id
      }
      let conversation = await this.messageService.GetConversationByCustomerAccountId(req);
      this.messageService.SetActiveConversation(conversation)
      this.messageService.SetActiveConversationId(conversation['conversation_id'])
    }

    this.webSocketService.emit('join', {'auth_info': JSON.parse(localStorage.getItem('auth_info')), 'room': this.messageQuery.getValue().active_conversation?.conversation_id});

    // this.webSocketService.listen('message').subscribe(message => {
    //   this.ListenMessage(message)
    // })

    await this.messageService.GetMoreMessageAndPushIntoStore({
      page:0,
      per_page:10,
      conversation_id: this.messageQuery.getValue().active_conversation_id
    }).then(_ => {
      this.messages=this.messageQuery.getValue().messages_list;
    })

    this.MessageScrollToBottom()
  }

  ListenMessage(message) {
    let account_id_from_server = message['account_id'];
    let account_id_from_client = this.accountQuery.getValue().auth_info.current_account.account_id;
    const isReplyMessage = account_id_from_server != account_id_from_client;
    message.type = isReplyMessage ? 'reply' : 'send';

    this.messages.push(message);
    this.messageStore.update({messages_list: this.messages})

    this.MessageScrollToBottom()
  }

  async SendMessage() {
    if(!this.chatText) {
      return;
    }
    const sendMessageReq = {
      conversation_id : this.messageQuery.getValue().active_conversation_id,
      account_id : this.accountQuery.getValue().auth_info.current_account.account_id,
      content : this.chatText,
      room: this.messageQuery.getValue().active_conversation?.conversation_id
    }
    this.webSocketService.emit('incoming-msg', sendMessageReq);
    this.chatText='';

    this.MessageScrollToBottom();
  }

  LeaveRoom() {
    this.webSocketService.emit('leave', {'room': 'ROOM'})
  }

  MessageScrollToBottom() {
    if(this.isDisplayMessage && this.message) {
      this.message.nativeElement.scrollTop=this.message?.nativeElement.scrollHeight;
    }
  }

  ToggleDisplayMessage() {
    this.isDisplayMessage = !this.isDisplayMessage;
    this.MessageScrollToBottom();
  }
}

