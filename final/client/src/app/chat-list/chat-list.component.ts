import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css'],

})
export class ChatListComponent implements OnInit {

  message: string = '';
  messageList: any[] = [];
  server = null;

  nickname: string;

  representationOfThis = this;

  constructor() {
    this.server = io('http://localhost:3000');
   }

  ngOnInit() {
    this.server.on('connect', (data) => {
      this.nickname = prompt("What is your name?");

      this.server.emit('join', this.nickname);
    })

    this.server.on('message', (message) => {
      this.messageList.push(message);
    });

    this.server.on('messages', (messages) => {
      this.messageList = messages;
    });

    this.server.on('join', (nickname) => {
      console.log(nickname);
    });
  }

  sendMessage() {
  //  this.messageList.push({ message: this.message, time: new Date().toLocaleTimeString() });
    this.server.emit('message', { message: this.message, time: new Date(), author: this.nickname });
    this.message = '';
  }

  getKeyPress(e) {
    if (e.code == "Enter" && !e.shiftKey) {
      this.sendMessage();
      return false;
    }
  }

}
