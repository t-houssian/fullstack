import { Component, OnInit, Output, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input() messages: Message[] = []

  constructor(private MessageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.MessageService.getMessages();
    this.MessageService.messageChangedEvent
      .subscribe(
        (messages: Message[])=>{
          this.messages = messages;
        })
  }

  onAddMessage(messages:Message) {
    this.messages.push(messages);
  }

}
