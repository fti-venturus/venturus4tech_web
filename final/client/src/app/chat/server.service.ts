import { Injectable } from "@angular/core";
import * as io from "socket.io-client";

@Injectable()
export class ServerService {

    server = io('http://localhost:3000');
    constructor() {
    }
}