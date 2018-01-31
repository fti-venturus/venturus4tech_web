import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from "app/chat/chat.service";
import { ChatHeaderComponent } from './chat/chat-header/chat-header.component';
import { LoginService } from 'app/login.service';
import { ChatItemComponent } from './chat/chat-item/chat-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ ChatService, LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
