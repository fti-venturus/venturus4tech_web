import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {
    
  }

  isUserLoggedIn() {
    return this.loginService.name.trim() != ''; 
  }

  ngOnInit() {
    this.loginService.login();
  }
}
