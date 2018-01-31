import { Injectable } from '@angular/core';
import { ServerService } from 'app/chat/server.service';

@Injectable()
export class LoginService {

  name: string = '';
  logTime: Date;

  constructor(
    private serverService: ServerService
  ) {}

  login() {
    while(!this.name.trim()) {
        this.name = prompt('Qual é o seu nome?');
        this.name = this.name ? this.name : '';
        this.serverService.server.emit('join',this.name);
    }
  }

}
