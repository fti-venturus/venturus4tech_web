import { ChatService } from './chat.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { LoginService } from 'app/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('scrollElement') scrollElement: ElementRef;

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
      console.log(error);
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
