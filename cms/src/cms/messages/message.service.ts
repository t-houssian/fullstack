import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[];

  constructor() {
    this.messages= MOCKMESSAGES;
  }

  getMessages(): Message[]{
    return this.messages;
  }

  getMessage(id:string): Message{
    for(let message of this.messages){
      if(message.id=id){
        return message;
      }
      else()=>{
        return null;
  
      }
  
    }
    return null;
  }

  addMessage(message:Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  
  }

}
