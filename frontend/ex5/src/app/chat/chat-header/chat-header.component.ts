import { ChatService } from '../chat.service';
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'app/login.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent {

  constructor(private loginService: LoginService) {
    
  }

  getUsername(): string {
    return this.loginService.name;
  }

}
