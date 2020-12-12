import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public socket: any;
  constructor() { 
    this.socket = io.connect('http://127.0.0.1:5000')
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data:any) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName, data) {
    this.socket.emit(eventName, data)
  }
}
