import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {
    name:string = '';
    constructor() {
    }

    login() {
        while(this.name.trim() == '') {
            this.name = prompt('Qual é seu nome');
            this.name = this.name ? this.name : '';
        }
    }
}