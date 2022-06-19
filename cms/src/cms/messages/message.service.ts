import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent = new Subject<Message[]>();

  messages: Message[]=[];
  maxMessageId: number;

  constructor(private http: HttpClient) { 

    // this.messages= MOCKMESSAGES;

  }

getMessages(): Message[]{
  this.http.get<Message[]>('https://cmst-58e58-default-rtdb.firebaseio.com/messages.json')
  .subscribe(
    (messages: Message[]) =>{
      this.messages = messages
      this.maxMessageId = this.getMaxId();
      this.messages.sort();
      this.messageChangedEvent.next(this.messages.slice());

    },
    (error:any) =>{
      console.log(error.message);
    }
  )
  return this.messages.slice();
}

storeMessages(){
  const json = JSON.stringify(this.messages);
  this.http.put(
    'https://cmst-58e58-default-rtdb.firebaseio.com/messages.json',
    json,
    {
      headers: new HttpHeaders({'Content-Type':'application/json'})

    }
  ).subscribe(() =>{
    this.messageChangedEvent.next(this.messages.slice());
  })
}

getMessage(id:string): Message{
  for(let message of this.messages){
    if(message.id===id){
      return message;
    }
    

  }
  return null;
}

getMaxId(): number {
  
  let maxId = 0;
  for (const message of this.messages) {
    
    const currentId = +message.id;
    //comparison between current id and preset max id (which will only change if current is greater)
    if (currentId > maxId) {
   
      maxId = currentId;
    }
  }
 
  return maxId;

}



addMessage(message:Message) {
  this.messages.push(message);
  this.storeMessages();

}


}