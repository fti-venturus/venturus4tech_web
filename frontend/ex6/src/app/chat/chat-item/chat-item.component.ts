import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'app/login.service';
@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {

  @Input('text') text:string;
  @Input('time') time:Date;
  @Input('author') author:string;

  public bgColor: string = "";
  public textColor: string = "";

  constructor(
    private loginService: LoginService
  ) { }

  isMyMessage():boolean {
    return this.author == this.loginService.name;
  }

  createColorFromString(str:string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  isColorDark(color) {
      let c = color.substring(1);  // strip #
      let rgb = parseInt(c, 16);   // convert rrggbb to decimal
      let r = (rgb >> 16) & 0xff;  // extract red
      let g = (rgb >>  8) & 0xff;  // extract green
      let b = (rgb >>  0) & 0xff;  // extract blue

      let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      console.log(luma);
      if (luma < 40) {
          return true;
      }
      return false;
  }

  ngOnInit() {
    this.bgColor = this.createColorFromString(this.author);
    this.textColor = this.isColorDark(this.bgColor) ? '#FFF' : '#000';
  }

}
