import { ChatService } from './chat.service';
import { Component } from '@angular/core';
import { LoginService } from 'app/login.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string = '';
  messageList: Object[] = [];

  constructor(
    private loginService: LoginService,
    private chatService: ChatService
  ) {
  }

  public sendMessage(): void {
    let message = {
      message: this.message,
      time: new Date(),
      author: this.loginService.name
    }
    this.chatService.postMessage(message).subscribe(
      (message) => {
        this.loadMessages();
        this.message = '';
    }, (error)=> {

    });
  }

  getKeyPress(e) {
    // se digitou apenas Enter, manda a mensagem, se apertou Shift também, não faz nada diferente, ou seja, apenas pula a linha
    if (e.code == "Enter" && !e.shiftKey) {
      this.sendMessage();
      e.preventDefault();
    }
  }

  loadMessages() {
    this.chatService.getMessages().subscribe((messages) => {
      this.messageList = messages;
    });
  }
  ngOnInit() {
    this.loadMessages();
  }
}
