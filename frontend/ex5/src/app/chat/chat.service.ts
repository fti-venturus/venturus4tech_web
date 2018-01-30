import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/Rx';

@Injectable()
export class ChatService {

    private url = 'http://localhost:3000/messages';
    private messageHeaders = new Headers();
    constructor(
        private http: Http
    ) {
    }

    getMessages():Observable<any[]> {
        return this.http.get(this.url).map(res => res.json());
    }

    postMessage(message: any):Observable<any> {
        this.messageHeaders.append('Content-Type', 'application/json');
        return this.http.post(this.url,message).map(res => res.json(), { headers: this.messageHeaders});
    } 
}