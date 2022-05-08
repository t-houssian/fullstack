import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender:string='Tyler Houssian';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const msgSub = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const sender = this.currentSender;
    const newMsg = new Message(1,msgSub,msgText,sender,)
    this.addMessageEvent.emit(newMsg);
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value ="";
  }
}
