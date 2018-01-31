import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  name: string = '';
  logTime: Date;

  constructor() {}

  login() {
    while(!this.name.trim()) {
        this.name = prompt('Qual é o seu nome?');
        this.name = this.name ? this.name : '';
        this.logTime = new Date();
    }
  }

}
