import { ChatService } from './chat.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { LoginService } from 'app/login.service';
import { ServerService } from 'app/chat/server.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollElement') scrollElement: ElementRef;

  message: string = '';
  messageList: Object[] = [];

  constructor(
    private loginService: LoginService,
    private chatService: ChatService,
    private serverService: ServerService
  ) {
  }

  scrollToBottom(el: ElementRef) {
    let div = el.nativeElement as HTMLDivElement;
    div.scrollTop = div.scrollHeight;
  }

  public sendMessage(): void {
    let message = {
      message: this.message,
      time: new Date(),
      author: this.loginService.name
    }
    this.serverService.server.emit('message', message);
    this.message = '';
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
    this.serverService.server.on('messages', (messages) => {
      console.log(messages);
      this.messageList = messages;
    });

    this.serverService.server.on('message', (message) => {
      this.messageList.push = message;
    });

  }

  ngAfterViewChecked() {
    this.scrollToBottom(this.scrollElement);
  }

}
